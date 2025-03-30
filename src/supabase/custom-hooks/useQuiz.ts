import { useState, useEffect } from 'react';
import { supabase } from '../config';
import { showNotification } from '@/lib/utils'
import { quizSchema } from "@/lib/validation";

const useQuiz = (assessmentId=null) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all quizzes
  const fetchQuizzes = async (assessmentId?: string) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('quiz').select('*');
      if (assessmentId) {
        query = query.eq('assessment', assessmentId);
      }
      const { data, error } = await query;
      if (error) throw error;
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Realtime subscription
  useEffect(() => {
    fetchQuizzes(assessmentId); // Initial fetch

    const subscription = supabase
      .channel('quiz-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quiz' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setQuizzes((prev) => [...prev, payload.new]);
              break;
            case 'UPDATE':
              setQuizzes((prev) =>
                prev.map((quiz) => (quiz.id === payload.new.id ? payload.new : quiz))
              );
              break;
            case 'DELETE':
              setQuizzes((prev) => prev.filter((quiz) => quiz.id !== payload.old.id));
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Add a new quiz
  const createQuiz = async (title: string, assessment: string, duration: number) => {
    const validationResult = quizSchema.safeParse({
      title,
      assessment,
      duration,
    });

    if (!validationResult.success) {
      setError(validationResult.error.message);
      showNotification('error', 'Invalid data provided for quiz creation!');
      return false;
    }

    try {
      const { error } = await supabase.from('quiz').insert([{ title, assessment, duration }]);
      if (error) throw error;
      showNotification('success', 'Quiz created successfully!');
      return true
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Quiz creation failed!');
      return false
    }
  };

// Update a quiz
const updateQuiz = async (assessmentId: string, updates: Record<string, any>) => {
  // Allow partial validation for updates
  const partialQuizSchema = quizSchema.partial();
  const validationResult = partialQuizSchema.safeParse(updates);

  if (!validationResult.success) {
    setError(validationResult.error.message);
    showNotification('error', 'Invalid data provided for quiz update!');
    return;
  }

  try {
    const { error } = await supabase.from('quiz').update(updates).eq('assessment', assessmentId);
    if (error) throw error;
    showNotification('success', 'Quiz updated successfully!');
  } catch (err) {
    setError(err.message);
    showNotification('error', 'Quiz update failed!');
  }
};


  // Delete a quiz
  const deleteQuiz = async (assessmentId) => {
    try {
      const { error } = await supabase.from('quiz').delete().eq('assessment', assessmentId);
      if (error) throw error;
      showNotification('success', 'Quiz deleted successfully!');     
      return true;
    } catch (err) {
      setError(err.message);
      showNotification('success', 'Quiz deletion failed!');     
      return false;
    }
  };

  return {
    quizzes,
    loading,
    error,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
};

export default useQuiz;
