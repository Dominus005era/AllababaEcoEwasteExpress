import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check saved local user session on mount
    try {
      const localUser = localStorage.getItem('ecotrace_user');
      if (localUser) {
        const parsed = JSON.parse(localUser);
        setCurrentUser(parsed);
        setUserRole(parsed.role || 'donor');
      }
    } catch (e) {
      console.warn('Failed to parse cached user session:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pure Frontend Donor Registration
  const registerDonor = async (email, password, displayName, upiId = '') => {
    const userEmail = email || 'donor@ecotrace.ai';
    const name = displayName || userEmail.split('@')[0];
    const userData = {
      id: 'donor-' + Date.now(),
      email: userEmail,
      displayName: name,
      upiId,
      role: 'donor'
    };

    setCurrentUser(userData);
    setUserRole('donor');
    localStorage.setItem('ecotrace_user', JSON.stringify(userData));
    return { success: true, user: userData, role: 'donor' };
  };

  // Pure Frontend Login (Accessible anytime for Donor or Recycler)
  const loginUser = async (email, password, targetRole = 'donor', cpcbCode = '') => {
    const userEmail = email || (targetRole === 'recycler' ? 'recycler@ecotrace.ai' : 'donor@ecotrace.ai');
    const name = userEmail.split('@')[0];
    const userData = {
      id: targetRole + '-' + Date.now(),
      email: userEmail,
      displayName: name,
      role: targetRole,
      cpcbCode: cpcbCode || 'CPCB-UP-2026-REC-04'
    };

    setCurrentUser(userData);
    setUserRole(targetRole);
    localStorage.setItem('ecotrace_user', JSON.stringify(userData));
    return { success: true, user: userData, role: targetRole };
  };

  // Pure Frontend Google Sign-In
  const loginWithGoogle = async () => {
    const googleUser = {
      id: 'google-donor-' + Date.now(),
      email: 'donor.google@ecotrace.ai',
      displayName: 'Google Donor User',
      role: 'donor'
    };

    setCurrentUser(googleUser);
    setUserRole('donor');
    localStorage.setItem('ecotrace_user', JSON.stringify(googleUser));
    return { success: true, user: googleUser, role: 'donor' };
  };

  // Pure Frontend Logout
  const logout = async () => {
    localStorage.removeItem('ecotrace_user');
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
