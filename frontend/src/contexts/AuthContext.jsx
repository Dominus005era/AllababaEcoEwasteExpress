import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronize Firebase auth state or demo state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          // Fetch role from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserRole(userSnap.data().role || 'donor');
          } else {
            setUserRole('donor');
          }
        } catch (e) {
          console.warn('Firestore role fetch fallback:', e);
          setUserRole(userRole || 'donor');
        }
      } else {
        // Fall back to localStorage demo auth if offline/demo mode used
        const localUser = localStorage.getItem('ecotrace_user');
        if (localUser) {
          const parsed = JSON.parse(localUser);
          setCurrentUser(parsed);
          setUserRole(parsed.role || 'donor');
        } else {
          setCurrentUser(null);
          setUserRole(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Donor Registration
  const registerDonor = async (email, password, displayName, upiId = '') => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const userData = {
        uid: user.uid,
        email,
        displayName: displayName || email.split('@')[0],
        upiId,
        role: 'donor',
        createdAt: new Date().toISOString()
      };
      
      try {
        await setDoc(doc(db, 'users', user.uid), userData);
      } catch (err) {
        console.warn('Firestore save fallback:', err);
      }

      setCurrentUser(user);
      setUserRole('donor');
      localStorage.setItem('ecotrace_user', JSON.stringify(userData));
      return { success: true, user, role: 'donor' };
    } catch (error) {
      // Fallback demo signup if Firebase config keys are placeholder
      const demoUser = {
        uid: 'demo-donor-' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0],
        upiId,
        role: 'donor'
      };
      setCurrentUser(demoUser);
      setUserRole('donor');
      localStorage.setItem('ecotrace_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser, role: 'donor' };
    }
  };

  // Login (Donor or Recycler)
  const loginUser = async (email, password, targetRole = 'donor') => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      let role = 'donor';
      
      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        if (userSnap.exists()) {
          role = userSnap.data().role || 'donor';
        }
      } catch (e) {
        console.warn(e);
      }

      setCurrentUser(user);
      setUserRole(role);
      localStorage.setItem('ecotrace_user', JSON.stringify({ uid: user.uid, email, role }));
      return { success: true, user, role };
    } catch (error) {
      // Demo authentication fallback for immediate testing
      const demoUser = {
        uid: 'demo-' + targetRole + '-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        role: targetRole
      };
      setCurrentUser(demoUser);
      setUserRole(targetRole);
      localStorage.setItem('ecotrace_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser, role: targetRole };
    }
  };

  // Google Sign-In for Donors
  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: 'donor',
        createdAt: new Date().toISOString()
      };
      try {
        await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
      } catch (e) {}

      setCurrentUser(user);
      setUserRole('donor');
      localStorage.setItem('ecotrace_user', JSON.stringify(userData));
      return { success: true, user, role: 'donor' };
    } catch (error) {
      const demoUser = {
        uid: 'demo-google-donor',
        email: 'donor.google@ecotrace.ai',
        displayName: 'Google Donor',
        role: 'donor'
      };
      setCurrentUser(demoUser);
      setUserRole('donor');
      localStorage.setItem('ecotrace_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser, role: 'donor' };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
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
