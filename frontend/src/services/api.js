const API_BASE = '/api';

async function apiFetch(endpoint, options = {}) {
  const token = sessionStorage.getItem('ecotrace_admin_token') ||
                sessionStorage.getItem('ecotrace_org_token') || 
                sessionStorage.getItem('ecotrace_comm_admin_token') || 
                localStorage.getItem('ecotrace_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'API Request failed');
    }
    return data;
  } catch (err) {
    console.warn(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

export const authApi = {
  registerDonor: (email, password, displayName, upiId) => 
    apiFetch('/auth/register-donor', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName, upiId })
    }),
  
  registerRecycler: (email, password, companyName, upiId, customCpcbCode, displayName = '', phone = '', address = '') =>
    apiFetch('/auth/register-recycler', {
      method: 'POST',
      body: JSON.stringify({ email, password, companyName, upiId, customCpcbCode, displayName, phone, address })
    }),

  getAuthorizedOrganizations: () => apiFetch('/auth/authorized-organizations'),

  login: (email, password, targetRole = 'donor', cpcbCode = '') =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, targetRole, cpcbCode })
    }),

  adminLogin: (email, password, securityKey = '') =>
    apiFetch('/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password, securityKey })
    }),

  getCurrentUser: () => apiFetch('/auth/me'),

  updateProfile: (profileData) =>
    apiFetch('/auth/update-profile', {
      method: 'POST',
      body: JSON.stringify(profileData)
    })
};

export const categoriesApi = {
  getAll: () => apiFetch('/categories'),
  getById: (id) => apiFetch(`/categories/${id}`),
  getBrands: (category = 'smartphone') => apiFetch(`/categories/meta/brands?category=${encodeURIComponent(category)}`),
  getModels: (category = 'smartphone', brand = '') => {
    const params = new URLSearchParams({ category });
    if (brand) params.append('brand', brand);
    return apiFetch(`/categories/meta/models?${params.toString()}`);
  },
  calculateValuation: (data) => apiFetch('/categories/calculate-valuation', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const scansApi = {
  analyzeImage: (imageBase64, categoryHint = '') => apiFetch('/scans/analyze-image', {
    method: 'POST',
    body: JSON.stringify({ imageBase64, categoryHint })
  }),
  logScan: (data) => apiFetch('/scans', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const recyclersApi = {
  getAll: (baseValue = 450, district = '') => {
    const params = new URLSearchParams({ baseValue });
    if (district) params.append('district', district);
    return apiFetch(`/recyclers?${params.toString()}`);
  },
  updateDutyStatus: (data) =>
    apiFetch('/recyclers/duty-status', {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  getDutyLogs: (recyclerId = '') => {
    const params = recyclerId ? `?recyclerId=${recyclerId}` : '';
    return apiFetch(`/recyclers/duty-logs${params}`);
  },
  getHistory: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/recyclers/history${query ? '?' + query : ''}`);
  },
  createDeliveryLot: (lotData) =>
    apiFetch('/recyclers/delivery-lots', {
      method: 'POST',
      body: JSON.stringify(lotData)
    }),
  getDeliveryLots: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/recyclers/delivery-lots${query ? '?' + query : ''}`);
  },
  updateDeliveryLot: (lotId, data) =>
    apiFetch(`/recyclers/delivery-lots/${lotId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  getBranches: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/recyclers/branches${query ? '?' + query : ''}`);
  },
  verifyDppHandover: (data) =>
    apiFetch('/recyclers/verify-dpp-handover', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

export const pickupApi = {
  create: (pickupData) =>
    apiFetch('/pickups', {
      method: 'POST',
      body: JSON.stringify(pickupData)
    }),

  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/pickups${query ? '?' + query : ''}`);
  },

  updateStatus: (requestId, status, recyclerName, agentName, agentPhone, agentVehicle) =>
    apiFetch(`/pickups/${requestId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, recyclerName, agentName, agentPhone, agentVehicle })
    }),

  assignAgent: (requestId, agentName, agentPhone, agentVehicle, status = 'Driver Assigned') =>
    apiFetch(`/pickups/${requestId}/assign-agent`, {
      method: 'PATCH',
      body: JSON.stringify({ agentName, agentPhone, agentVehicle, status })
    })
};

export const adminApi = {
  getStats: () => apiFetch('/admin/stats'),
  getUsers: () => apiFetch('/admin/users'),
  getDonorDossier: (id) => apiFetch(`/admin/donors/${id}/dossier`),
  getDonorOrders: (id) => apiFetch(`/admin/donors/${id}/orders`),
  deleteDonor: (id) => apiFetch(`/admin/donors/${id}`, { method: 'DELETE' }),
  getRecyclers: () => apiFetch('/admin/recyclers'),
  getRecyclerOrders: (id) => apiFetch(`/admin/recyclers/${id}/orders`),
  deleteRecycler: (id) => apiFetch(`/admin/recyclers/${id}`, { method: 'DELETE' }),
  getPickups: () => apiFetch('/admin/pickups'),
  updateOrder: (id, data) => apiFetch(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteOrder: (id) => apiFetch(`/admin/orders/${id}`, { method: 'DELETE' }),
  deleteUser: (id) => apiFetch(`/admin/users/${id}`, { method: 'DELETE' }),
  getCommunityAdmins: () => apiFetch('/admin/community-admins'),
  getCommunityAdminHistory: (id) => apiFetch(`/admin/community-admins/${id}/history`),
  getSubAdminDossier: (id) => apiFetch(`/admin/community-admins/${id}/dossier`),
  toggleSubAdminStatus: (id) => apiFetch(`/admin/community-admins/${id}/toggle-status`, { method: 'POST' }),
  deleteCommunityAdmin: (id) => apiFetch(`/admin/community-admins/${id}`, { method: 'DELETE' }),
  getCommunityEvents: () => apiFetch('/admin/events'),
  updateEvent: (id, data) => apiFetch(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  toggleEventTrending: (id) => apiFetch(`/admin/events/${id}/toggle-trending`, { method: 'PUT' }),
  deleteEvent: (id) => apiFetch(`/admin/events/${id}`, { method: 'DELETE' }),
  getEventProposals: () => apiFetch('/admin/event-proposals'),
  approveProposal: (id, data) => apiFetch(`/admin/event-proposals/${id}/approve`, { method: 'POST', body: JSON.stringify(data || {}) }),
  deleteProposal: (id) => apiFetch(`/admin/event-proposals/${id}`, { method: 'DELETE' }),
  getPartnerApplications: () => apiFetch('/admin/partner-applications'),
  approvePartnerApplication: (id) => apiFetch(`/admin/partner-applications/${id}/approve`, { method: 'POST' }),
  rejectPartnerApplication: (id) => apiFetch(`/admin/partner-applications/${id}/reject`, { method: 'POST' }),
  deletePartnerApplication: (id) => apiFetch(`/admin/partner-applications/${id}`, { method: 'DELETE' }),
  deletePartnerOrganization: (id) => apiFetch(`/admin/partner-organizations/${id}`, { method: 'DELETE' }),
  toggleOrganizationApproval: (id, isApproved) => 
    apiFetch(`/admin/partner-organizations/${id}/toggle-approval`, { 
      method: 'PATCH', 
      body: JSON.stringify({ isApproved }) 
    }),
  getPartnerOrganizationDossier: (id) => apiFetch(`/admin/partner-organizations/${id}/dossier`),
  updateSubAdminCredentials: (id, data) => apiFetch(`/admin/community-admins/${id}/credentials`, { method: 'PUT', body: JSON.stringify(data) }),
  updatePartnerCredentials: (id, data) => apiFetch(`/admin/partner-organizations/${id}/credentials`, { method: 'PUT', body: JSON.stringify(data) }),
  getRecyclerDossier: (id) => apiFetch(`/admin/recyclers/${id}/dossier`),
  addRecyclerUnderOrg: (id, data) => apiFetch(`/admin/partner-organizations/${id}/add-recycler`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getGrievances: () => apiFetch('/admin/grievances'),
  updateGrievanceStatus: (id, status, adminNotes) => 
    apiFetch(`/admin/grievances/${id}/status`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status, adminNotes }) 
    }),
  deleteGrievance: (id) => apiFetch(`/admin/grievances/${id}`, { method: 'DELETE' }),

  // 11. AI Hardware Scans & Elemental Matrix
  getScans: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/scans${query ? '?' + query : ''}`);
  },
  getScanDetails: (id) => apiFetch(`/admin/scans/${id}`),
  deleteScan: (id) => apiFetch(`/admin/scans/${id}`, { method: 'DELETE' }),

  // 12. 4-Layer Datasets & Pricing Engine
  getDatasetDevices: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/datasets/devices${query ? '?' + query : ''}`);
  },
  getDatasetMaterials: () => apiFetch('/admin/datasets/materials'),
  getDatasetPricing: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/datasets/pricing${query ? '?' + query : ''}`);
  },
  getDatasetValuations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/datasets/valuations${query ? '?' + query : ''}`);
  },

  // 13. Consignment Depot Delivery Lots
  getDepotLots: () => apiFetch('/admin/depot-lots'),
  verifyDepotLot: (id, data = {}) => apiFetch(`/admin/depot-lots/${id}/verify`, { method: 'PATCH', body: JSON.stringify(data) }),

  // 14. Digital Product Passports (DPP)
  getDppPassports: () => apiFetch('/admin/dpp-passports'),

  // 15. System Health & Diagnostics
  getSystemHealth: () => apiFetch('/admin/system-health')
};

export const partnersApi = {
  submitApplication: (data) =>
    apiFetch('/partners/apply', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  login: (email, orgId, password) =>
    apiFetch('/partners/login', {
      method: 'POST',
      body: JSON.stringify({ email, orgId, password })
    }),
  getEcosystemData: () => apiFetch('/partners/ecosystem-data'),
  getDashboard: () => apiFetch('/partners/dashboard'),
  updateBatchStatus: (batchId, newStatus) =>
    apiFetch('/partners/update-batch-status', {
      method: 'POST',
      body: JSON.stringify({ batchId, newStatus })
    }),
  issueCertificate: (data) =>
    apiFetch('/partners/issue-certificate', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getDepotIntake: () => apiFetch('/partners/depot-intake'),
  verifyDepotIntake: (lotId, data = {}) =>
    apiFetch(`/partners/depot-intake/${lotId}/verify`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  getFieldRecyclersMonitor: () => apiFetch('/partners/field-recyclers-monitor'),
  getBranches: () => apiFetch('/partners/branches'),
  createBranch: (data) =>
    apiFetch('/partners/branches', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateBranch: (branchId, data) =>
    apiFetch(`/partners/branches/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteBranch: (branchId) =>
    apiFetch(`/partners/branches/${branchId}`, {
      method: 'DELETE'
    }),
  getIncomingPickupRequests: () => apiFetch('/partners/incoming-requests'),
  getWorkforceRecyclers: () => apiFetch('/partners/workforce-recyclers'),
  allocateRecyclerToRequest: (requestId, data) =>
    apiFetch(`/partners/requests/${requestId}/allocate-recycler`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  changePassword: (data) =>
    apiFetch('/partners/change-password', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

export const communityEventsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-events${query ? '?' + query : ''}`);
  },
  getById: (id) => apiFetch(`/community-events/${id}`),
  joinEvent: (id, data) =>
    apiFetch(`/community-events/${id}/join`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getMyRegistrations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-events/user/my-registrations${query ? '?' + query : ''}`);
  },
  submitProposal: (data) =>
    apiFetch('/community-events/propose-host', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

export const communityAdminApi = {
  login: (usernameOrEmail, password) =>
    apiFetch('/community-admin/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password })
    }),
  getStats: () => apiFetch('/community-admin/stats'),
  getEvents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-admin/events${query ? '?' + query : ''}`);
  },
  createEvent: (data) =>
    apiFetch('/community-admin/events', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateEvent: (id, data) =>
    apiFetch(`/community-admin/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteEvent: (id) =>
    apiFetch(`/community-admin/events/${id}`, {
      method: 'DELETE'
    }),
  toggleTrending: (id) =>
    apiFetch(`/community-admin/events/${id}/toggle-trending`, {
      method: 'PUT'
    }),
  getPasses: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-admin/passes${query ? '?' + query : ''}`);
  },
  getPassByEvent: (eventId) =>
    apiFetch(`/community-admin/passes/event/${eventId}`),
  createPass: (data) =>
    apiFetch('/community-admin/passes', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  deletePass: (id) =>
    apiFetch(`/community-admin/passes/${id}`, {
      method: 'DELETE'
    }),
  getRegistrations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-admin/registrations${query ? '?' + query : ''}`);
  },
  updateRegistrationStatus: (id, status) =>
    apiFetch(`/community-admin/registrations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
  updateRegistrationCheckin: (id, checkinStatus, notes = '') =>
    apiFetch(`/community-admin/registrations/${id}/checkin`, {
      method: 'PUT',
      body: JSON.stringify({ checkinStatus, notes })
    }),
  getAnnouncements: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-admin/announcements${query ? '?' + query : ''}`);
  },
  createAnnouncement: (data) =>
    apiFetch('/community-admin/announcements', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  deleteAnnouncement: (id) =>
    apiFetch(`/community-admin/announcements/${id}`, {
      method: 'DELETE'
    }),
  getProposals: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/community-admin/proposals${query ? '?' + query : ''}`);
  },
  endorseProposal: (id, data) =>
    apiFetch(`/community-admin/proposals/${id}/endorse`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  rejectProposal: (id, data) =>
    apiFetch(`/community-admin/proposals/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  changePassword: (data) =>
    apiFetch('/community-admin/change-password', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

// Live Environmental & E-Waste News API
export const newsApi = {
  getLiveNews: () => apiFetch('/news')
};

// EcoBot Chat API
export const ecobotApi = {
  chat: (message, history = []) =>
    apiFetch('/ecobot/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history })
    })
};

// Help & Support Core API
export const supportApi = {
  chat: (message, history = []) =>
    apiFetch('/support/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history })
    }),
  createGrievance: (data) =>
    apiFetch('/support/grievances', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getMyGrievances: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/support/grievances/my${query ? '?' + query : ''}`);
  }
};



