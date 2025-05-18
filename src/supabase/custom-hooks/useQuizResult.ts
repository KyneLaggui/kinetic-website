import { useState, useEffect } from 'react';
import { supabase } from '../config';
import { showNotification } from '@/lib/utils';
import { quizResultSchema } from '@/lib/validation';

const useQuizResult = (userId = null, fetchUserDetails = false) => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all quiz results
  const fetchQuizResults = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      // Always fetch quiz details, optionally fetch user details
      let query = supabase
        .from('quiz_result')
        .select(`*, quiz:quiz(*)${fetchUserDetails ? ', user:user(*)' : ''}`);
  
      if (userId) {
        query = query.eq('user_id', userId);
      }
  
      const { data, error } = await query;
      if (error) throw error;
      setQuizResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Inside useQuizResult
  const fetchByAssessmentNumber = async (assessmentNumber) => {
    try {
      const { data, error } = await supabase
        .from('quiz_result')
        .select('*')
        .eq('assessment_number', assessmentNumber);

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };


  // Realtime subscription
  useEffect(() => {
    fetchQuizResults(userId);

    const subscription = supabase
      .channel('quiz-result-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_result' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setQuizResults((prev) => [...prev, payload.new]);
              break;
            case 'UPDATE':
              setQuizResults((prev) =>
                prev.map((result) => (result.id === payload.new.id ? payload.new : result))
              );
              break;
            case 'DELETE':
              setQuizResults((prev) => prev.filter((result) => result.id !== payload.old.id));
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
  }, [userId, fetchUserDetails]); // Added `fetchUserDetails` to dependency array to re-trigger effect on change

  // Add a new quiz result
  const createQuizResult = async (userId, assessmentNumber, answers, score) => {
    const validationResult = quizResultSchema.safeParse({
      user_id: userId,
      assessment_number: assessmentNumber,
      answers,
      score,
    });

    if (!validationResult.success) {
      setError(validationResult.error.message);
      showNotification('error', 'Invalid data provided for quiz result!');
      return false;
    }

    try {
      const { error } = await supabase.from('quiz_result').insert([
        { user_id: userId, assessment_number: assessmentNumber, answers, score },
      ]);
      if (error) throw error;
      showNotification('success', 'Quiz result saved successfully!');
      return true;
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Failed to save quiz result!');
      return false;
    }
  };

  // Update a quiz result
  const updateQuizResult = async (id, updates) => {
    const partialSchema = quizResultSchema.partial();
    const validationResult = partialSchema.safeParse(updates);

    if (!validationResult.success) {
      setError(validationResult.error.message);
      showNotification('error', 'Invalid data provided for quiz result update!');
      return;
    }

    try {
      const { error } = await supabase.from('quiz_result').update(updates).eq('id', id);
      if (error) throw error;
      showNotification('success', 'Quiz result updated successfully!');
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Quiz result update failed!');
    }
  };

  // Delete a quiz result
  const deleteQuizResult = async (id) => {
    try {
      const { error } = await supabase.from('quiz_result').delete().eq('id', id);
      if (error) throw error;
      showNotification('success', 'Quiz result deleted successfully!');
      return true;
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Quiz result deletion failed!');
      return false;
    }
  };

  return {
    quizResults,
    loading,
    error,
    createQuizResult,
    updateQuizResult,
    deleteQuizResult,
    fetchByAssessmentNumber,
  };
};

export default useQuizResult;
