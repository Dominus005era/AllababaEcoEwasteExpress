import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const role = await fetchRole(session.user);
        setCurrentUser(session.user);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    // Listen to Supabase Auth State changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const role = await fetchRole(session.user);
        setCurrentUser(session.user);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper to fetch exact role from profiles table or metadata
  const fetchRole = async (user) => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (data && data.role) {
        return data.role;
      }
    } catch (e) {}
    return user.user_metadata?.role || 'donor';
  };

  // Donor Registration with Supabase
  const registerDonor = async (email, password, displayName, upiId = '') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: displayName || email.split('@')[0],
          role: 'donor',
          upiId
        }
      }
    });

    if (error) {
      throw new Error(error.message || 'Registration failed.');
    }

    const user = data.user;

    // Create profile row in Supabase profiles table
    if (user) {
      try {
        await supabase.from('profiles').upsert([
          { id: user.id, email, display_name: displayName, role: 'donor', upi_id: upiId }
        ]);
      } catch (e) {
        console.warn('Profile insert note:', e);
      }
    }

    setCurrentUser(user);
    setUserRole('donor');
    return { success: true, user, role: 'donor' };
  };

  // Strict Login (Donor or Authorized Recycler) with Supabase
  const loginUser = async (email, password, targetRole = 'donor') => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message || 'Invalid email or password.');
    }

    const user = data.user;
    const role = await fetchRole(user);

    // If logging into Authorized Recycler Portal, verify account has recycler/admin role
    if (targetRole === 'recycler' && role !== 'recycler' && role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access Denied: This account is not an authorized CPCB Smelter/Recycler.');
    }

    setCurrentUser(user);
    setUserRole(role);
    return { success: true, user, role };
  };

  // Google Sign-In with Supabase OAuth
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
    if (error) {
      throw new Error(error.message || 'Google authentication failed.');
    }
    return { success: true, data };
  };

  // Logout with Supabase
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    loading,
    registerDonor,
    loginUser,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
