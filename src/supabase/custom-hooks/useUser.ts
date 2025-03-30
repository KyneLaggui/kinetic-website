import { useState, useEffect } from 'react';
import { supabase } from '../config';
import { showNotification } from '@/lib/utils';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('user').select('*');
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Realtime subscription
  useEffect(() => {
    fetchUsers(); // Initial fetch

    const subscription = supabase
      .channel('user-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setUsers((prev) => [...prev, payload.new]);
              break;
            case 'UPDATE':
              setUsers((prev) =>
                prev.map((user) => (user.student_id === payload.new.student_id ? payload.new : user))
              );
              break;
            case 'DELETE':
              setUsers((prev) => prev.filter((user) => user.student_id !== payload.old.student_id));
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

  // Add a new user
  const createUser = async (user) => {
    try {
      const { error } = await supabase.from('user').insert([user]);
      if (error) throw error;
      showNotification('success', 'User added successfully!');
      return true;
    } catch (err) {
      console.log(err);
      showNotification('error', 'User addition failed!');
      return false;
    }
  };

  // Update a user
  const updateUser = async (student_id, updates) => {
    try {
      const { error } = await supabase.from('user').update(updates).eq('student_id', student_id);
      if (error) throw error;
      showNotification('success', 'User updated successfully!');
    } catch (err) {
      setError(err.message);
      showNotification('error', 'User update failed!');
    }
  };

  // Delete a user
  const deleteUser = async (student_id) => {
    try {
      const { error } = await supabase.from('user').delete().eq('student_id', student_id);
      if (error) throw error;
      showNotification('success', 'User deleted successfully!');
    } catch (err) {
      setError(err.message);
      showNotification('error', 'User deletion failed!');
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUser;
