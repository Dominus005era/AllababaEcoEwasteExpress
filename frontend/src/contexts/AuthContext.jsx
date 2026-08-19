import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // Resume user session from localStorage
      try {
        const token = localStorage.getItem('ecotrace_token');
        if (token) {
          const data = await authApi.getCurrentUser();
          if (data.user) {
            setCurrentUser(data.user);
            setUserRole(data.user.role || 'donor');
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Session check fallback to local storage');
      }

      const localUser = localStorage.getItem('ecotrace_user');
      if (localUser) {
        try {
          const parsed = JSON.parse(localUser);
          setCurrentUser(parsed);
          setUserRole(parsed.role || 'donor');
        } catch (e) {}
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // 1. Donor Registration with Prototype Fallback
  const registerDonor = async (email, password, displayName, upiId = '') => {
    try {
      const res = await authApi.registerDonor(email, password, displayName, upiId);
      if (res.token) {
        localStorage.setItem('ecotrace_token', res.token);
      }
      const user = { ...res.user, profileCompleted: false };
      setCurrentUser(user);
      setUserRole('donor');
      localStorage.setItem('ecotrace_user', JSON.stringify(user));
      return { success: true, user, role: 'donor', message: res.message };
    } catch (err) {
      console.warn('Backend unavailable, using mock donor registration:', err.message);
      const mockDonor = {
        id: `ECO-DNR-${Math.floor(1000 + Math.random() * 9000)}`,
        email: email || 'donor@ecotrace.ai',
        displayName: displayName || 'E-Waste Donor',
        role: 'donor',
        upiId: upiId || 'donor@upi',
        district: 'Prayagraj',
        address: 'Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004',
        profileCompleted: false,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(mockDonor);
      setUserRole('donor');
      localStorage.setItem('ecotrace_token', 'mock-token-donor');
      localStorage.setItem('ecotrace_user', JSON.stringify(mockDonor));
      return { success: true, user: mockDonor, role: 'donor', isMock: true };
    }
  };

  // 2. Recycler Registration under Authorized Organization with Fallback
  const registerRecycler = async (data) => {
    try {
      const res = await authApi.registerRecycler(data);
      if (res.token) {
        localStorage.setItem('ecotrace_token', res.token);
      }
      const user = res.user;
      setCurrentUser(user);
      setUserRole('recycler');
      localStorage.setItem('ecotrace_user', JSON.stringify(user));
      return { success: true, user, role: 'recycler', message: res.message };
    } catch (err) {
      console.warn('Backend unavailable, using mock recycler registration:', err.message);
      const mockRecycler = {
        id: `AUTH-REC-${Math.floor(100 + Math.random() * 900)}`,
        email: data.email || 'recycler@greendrop.org',
        displayName: data.officerName || 'Recycler Officer',
        name: data.officerName || 'Recycler Officer',
        companyName: data.companyName || 'GreenDrop Circular Metals Ltd',
        cpcbLicense: data.cpcbLicense || 'CPCB-UP-2026-REC-0891',
        role: 'recycler',
        district: data.district || 'Prayagraj',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(mockRecycler);
      setUserRole('recycler');
      localStorage.setItem('ecotrace_token', 'mock-token-recycler');
      localStorage.setItem('ecotrace_user', JSON.stringify(mockRecycler));
      return { success: true, user: mockRecycler, role: 'recycler', isMock: true };
    }
  };

  // 3. Login User / Recycler / Org Admin
  const loginUser = async (email, password, targetRole = 'donor', cpcbCode = '') => {
    try {
      const res = await authApi.login(email, password, targetRole, cpcbCode);
      if (res.token) {
        localStorage.setItem('ecotrace_token', res.token);
      }
      const user = res.user;
      const role = user.role || targetRole;
      setCurrentUser(user);
      setUserRole(role);
      localStorage.setItem('ecotrace_user', JSON.stringify(user));
      return { success: true, user, role };
    } catch (err) {
      console.warn('Backend login offline, fallback to prototype login:', err.message);
      const isRecycler = targetRole === 'recycler';
      const isOrg = targetRole === 'org-admin';
      const mockUser = {
        id: isRecycler ? 'AUTH-REC-004' : isOrg ? 'ORG-ADM-001' : 'ECO-DNR-4932',
        email: email || (isRecycler ? 'recycler@greendrop.org' : isOrg ? 'admin@ecotrace.org' : 'donor@ecotrace.ai'),
        displayName: isRecycler ? 'Siddharth Shukla' : isOrg ? 'Corporate Admin' : 'Aarav Sharma',
        name: isRecycler ? 'Siddharth Shukla' : isOrg ? 'Corporate Admin' : 'Aarav Sharma',
        companyName: isRecycler ? 'GreenDrop Circular Metals Ltd' : isOrg ? 'EcoTrace Org' : undefined,
        cpcbLicense: isRecycler ? (cpcbCode || 'CPCB-UP-2026-REC-0891') : undefined,
        role: targetRole,
        district: 'Prayagraj',
        upiId: 'aarav.sharma@okhdfcbank',
        address: 'Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(mockUser);
      setUserRole(targetRole);
      localStorage.setItem('ecotrace_token', 'mock-prototype-token-' + targetRole);
      localStorage.setItem('ecotrace_user', JSON.stringify(mockUser));
      return { success: true, user: mockUser, role: targetRole, isMock: true };
    }
  };

  const loginWithGoogle = async () => {
    const demoUser = {
      id: 'google-donor-101',
      email: 'donor.google@ecotrace.ai',
      displayName: 'Google Donor',
      role: 'donor',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(demoUser);
    setUserRole('donor');
    localStorage.setItem('ecotrace_user', JSON.stringify(demoUser));
    return { success: true, user: demoUser, role: 'donor' };
  };

  // Update Profile details
  const updateProfile = async (updatedFields) => {
    const updated = { ...currentUser, ...updatedFields, profileCompleted: true };
    setCurrentUser(updated);
    localStorage.setItem('ecotrace_user', JSON.stringify(updated));
    try {
      await authApi.updateProfile({ ...updatedFields, profile_completed: true });
    } catch (e) {
      console.warn('API update-profile fallback:', e.message);
    }
    return updated;
  };

  const logout = async () => {
    sessionStorage.removeItem('ecotrace_org_token');
    sessionStorage.removeItem('ecotrace_org_user');
    localStorage.removeItem('ecotrace_user');
    localStorage.removeItem('ecotrace_token');
    localStorage.removeItem('ecotrace_org_token');
    localStorage.removeItem('ecotrace_org_user');

    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    loading,
    registerDonor,
    registerRecycler,
    loginUser,
    loginWithGoogle,
    updateProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
