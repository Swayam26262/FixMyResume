import axios from 'axios';

// Create a dedicated axios instance for the API
const api = axios.create({
  // Abandoning Vite proxy for local dev. Connecting directly.
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
      config.headers['Authorization'] = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  register: async (userData) => {
    const response = await api.post('auth/register/', userData);
    return response.data;
  },

  verifyOTP: async (otpData) => {
    const response = await api.post('auth/verify-otp/', otpData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('auth/login/', credentials);
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  refreshToken: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.refresh) {
      const response = await api.post('auth/token/refresh/', {
        refresh: user.refresh
      });
      if (response.data.access) {
        user.access = response.data.access;
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    }
    return null;
  },

  getAnalysisHistory: async () => {
    // The interceptor automatically adds the auth header
    const response = await api.get('auth/history/');
    return response.data;
  },

  // Resume-related API methods
  parseResume: async (formData) => {
    const response = await api.post('parse-resume/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  analyzeResume: async (data) => {
    // The interceptor automatically adds the auth header
    const response = await api.post('analyze-resume/', data);
    return response.data;
  },
};

// Add request interceptor to the dedicated instance
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.access) {
      config.headers['Authorization'] = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to the dedicated instance
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await authService.refreshToken();
        if (newToken && newToken.access) {
          api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken.access;
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken.access;
          return api(originalRequest);
        }
      } catch (refreshError) {
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default authService;