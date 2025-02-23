import { useState, useEffect } from 'react';
import { supabase } from '../config';

const useQuiz = (id) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all quizzes
  const fetchQuizzes = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('quiz').select('*').eq('id', id);
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
    fetchQuizzes(id); // Initial fetch

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
  const createQuiz = async (title, assessment, duration) => {
    try {
      const { error } = await supabase.from('quiz').insert([{ title, assessment, duration }]);
      if (error) throw error;
      return true
    } catch (err) {
      setError(err.message);
      return false
    }
  };

  // Update a quiz
  const updateQuiz = async (id, updates) => {
    try {
      const { error } = await supabase.from('quiz').update(updates).eq('id', id);
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a quiz
  const deleteQuiz = async (id) => {
    try {
      const { error } = await supabase.from('quiz').delete().eq('id', id);
      if (error) throw error;
    } catch (err) {
      setError(err.message);
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
