import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign up with email and password
  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut({ scope: 'local'});
    if (error) setError(error.message);
    setUser(null);
    setLoading(false);
  };

  // Check user authentication status
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user ?? null);
    setLoading(false);
  };

  useEffect(() => {
    // Check user on component mount
    checkUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
