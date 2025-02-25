import { useState, useEffect } from 'react';
import { supabase } from '../config';
import { showNotification } from '@/lib/utils' 

const useQuestion = (id) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all quizzes
  const fetchQuestions = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('question').select('*').eq('quiz_id', id); 
      if (error) throw error;
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Realtime subscription
  useEffect(() => {
    fetchQuestions(id); // Initial fetch

    const subscription = supabase
      .channel('question-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'question' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
                setQuestions((prev) => [...prev, payload.new]);
              break;
            case 'UPDATE':
                setQuestions((prev) =>
                prev.map((question) => (question.id === payload.new.id ? payload.new : question))
              );
              break;
            case 'DELETE':
                setQuestions((prev) => prev.filter((question) => question.id !== payload.old.id));
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
  const createQuestion = async (description, choices, answer, quizId) => {
    try {
      const { error } = await supabase.from('question').insert([{ description, choices, "quiz_id": quizId }]);
      if (error) throw error;
      showNotification('success', 'Question added successfuly!')
      return true
    } catch (err) {
      console.log(err);
      showNotification('error', 'Question addition failed!')
      return false
    }
  };

  // Update a quiz
  const updateQuestion = async (id, updates) => {
    try {
      const { error } = await supabase.from('question').update(updates).eq('id', id);
      if (error) throw error;
      showNotification('success', 'Question updated successfuly!')
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Question update failed!')
    }
  };

  // Delete a quiz
  const deleteQuestion = async (id) => {
    try {
      const { error } = await supabase.from('question').delete().eq('id', id);
      if (error) throw error;
      showNotification('success', 'Question deleted successfuly!')
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Question deletion failed!')
    }
  };

  return {
    questions,
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};

export default useQuestion;
