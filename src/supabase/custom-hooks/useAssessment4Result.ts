import { useState, useEffect } from 'react';
import { supabase } from '../config';
import { showNotification } from '@/lib/utils';
import { assessment4ResultSchema } from '@/lib/validation';

const useAssessment4Result = (userId = null) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('assessment_4_result')
        .select('*');

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(userId);

    const subscription = supabase
      .channel('assessment-4-result-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'assessment_4_result' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setResults((prev) => [...prev, payload.new]);
              break;
            case 'UPDATE':
              setResults((prev) =>
                prev.map((result) =>
                  result.id === payload.new.id ? payload.new : result
                )
              );
              break;
            case 'DELETE':
              setResults((prev) =>
                prev.filter((result) => result.id !== payload.old.id)
              );
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
  }, [userId]);

  const createResult = async (userId, assessmentNumber, answers, score) => {
    const validationResult = assessment4ResultSchema.safeParse({
      user_id: userId,
      assessment_number: assessmentNumber,
      answers,
      score,
    });

    if (!validationResult.success) {
      setError(validationResult.error.message);
      showNotification('error', 'Invalid data for Assessment 4 result!');
      return false;
    }

    try {
      const { error } = await supabase.from('assessment_4_result').insert([
        {
          user_id: userId,
          assessment_number: assessmentNumber,
          answers,
          score,
        },
      ]);
      if (error) throw error;
      showNotification('success', 'Assessment 4 result saved!');
      return true;
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Failed to save Assessment 4 result!');
      return false;
    }
  };

  const updateResult = async (id, updates) => {
    const partialSchema = assessment4ResultSchema.partial();
    const validationResult = partialSchema.safeParse(updates);

    if (!validationResult.success) {
      setError(validationResult.error.message);
      showNotification('error', 'Invalid data for update!');
      return;
    }

    try {
      const { error } = await supabase
        .from('assessment_4_result')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      showNotification('success', 'Assessment 4 result updated!');
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Update failed!');
    }
  };

  const deleteResult = async (id) => {
    try {
      const { error } = await supabase
        .from('assessment_4_result')
        .delete()
        .eq('id', id);
      if (error) throw error;
      showNotification('success', 'Assessment 4 result deleted!');
      return true;
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Deletion failed!');
      return false;
    }
  };

  return {
    results,
    loading,
    error,
    createResult,
    updateResult,
    deleteResult,
  };
};

export default useAssessment4Result;
