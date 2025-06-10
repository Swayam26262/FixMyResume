import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

const authService = {
  register: async (userData) => {
    const response = await axios.post(API_URL + 'register/', userData);
    return response.data;
  },

  verifyOTP: async (otpData) => {
    const response = await axios.post(API_URL + 'verify-otp/', otpData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(API_URL + 'login/', credentials);
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify({
        access: response.data.access,
        refresh: response.data.refresh
      }));
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
      const response = await axios.post(API_URL + 'token/refresh/', {
        refresh: user.refresh
      });
      if (response.data.access) {
        user.access = response.data.access;
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    }
    return null;
  }
};

// Add axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await authService.refreshToken();
        if (newToken) {
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken.access;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        authService.logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Add axios interceptor for adding token to requests
axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.access) {
      config.headers['Authorization'] = 'Bearer ' + user.access;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService; 