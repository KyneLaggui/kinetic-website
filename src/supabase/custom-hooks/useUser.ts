import { useState, useEffect } from 'react';
import { supabase } from '../config';
import { showNotification } from '@/lib/utils';

// Define the User type based on your Supabase table structure
export type User = {
  id: number;
  created_at: string;
  student_id: string;
  year: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  section: string;
};

// Define return type for the hook
type UseUserResult = {
  users: User[];
  loading: boolean;
  error: string | null;
  createUser: (user: Omit<User, 'id' | 'created_at'>) => Promise<boolean>;
  updateUser: (id: number, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

const useUser = (id?: number): UseUserResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('user').select('*');
      
      if (id) {
        query = query.eq('id', id); // Fetch user by student_id if provided
      }

      const { data, error } = await query;
      if (error) throw error;
      setUsers(data as User[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUsers();

    const subscription = supabase
      .channel('user-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user' },
        (payload) => {
          const newUser = payload.new as User;
          const oldUser = payload.old as User;

          switch (payload.eventType) {
            case 'INSERT':
              setUsers((prev) => [...prev, newUser]);
              break;
            case 'UPDATE':
              setUsers((prev) =>
                prev.map((user) =>
                  user.student_id === newUser.student_id ? newUser : user
                )
              );
              break;
            case 'DELETE':
              setUsers((prev) =>
                prev.filter((user) => user.student_id !== oldUser.student_id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]); // Re-run effect if student_id changes

  const createUser = async (user: Omit<User, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      const { error } = await supabase.from('user').insert([user]);
      if (error) throw error;
      showNotification('success', 'User added successfully!');
      return true;
    } catch (err) {
      console.error(err);
      showNotification('error', 'User addition failed!');
      return false;
    }
  };

  const updateUser = async (id: number, updates: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('user')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      showNotification('success', 'User updated successfully!');
    } catch (err: any) {
      setError(err.message);
      showNotification('error', 'User update failed!');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const { error } = await supabase
        .from('user')
        .delete()
        .eq('id', id);
      if (error) throw error;
      showNotification('success', 'User deleted successfully!');
    } catch (err: any) {
      setError(err.message);
      showNotification('error', 'User deletion failed!');
    }
  };

  const fetchUserById = async (userId: number): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', userId)
        .single();
  
      if (error) throw error;
      return data as User;
    } catch (err) {
      console.error(`Error fetching user ${userId}:`, err);
      return null;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    fetchUserById,
  };
};

export default useUser;
