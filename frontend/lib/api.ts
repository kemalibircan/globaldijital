import axios from 'axios';
import { startApi, endApi } from '@/lib/loadingStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Tarayıcıda: production'da (80/443) aynı origin + /api (Nginx proxy);
 * geliştirme/IP erişiminde hostname:5000 (Private Network Access uyumlu).
 */
export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    const isStandardPort = !port || port === '80' || port === '443';
    if (isStandardPort) return `${protocol}//${hostname}/api`;
    return `${protocol}//${hostname}:5000/api`;
  }
  return API_URL;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available; tarayıcıda API URL'i aynı host üzerinden kullan
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.baseURL = getApiUrl();
    startApi();
  }
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration + global spinner
api.interceptors.response.use(
  (response) => {
    if (typeof window !== 'undefined') endApi();
    return response;
  },
  (error) => {
    if (typeof window !== 'undefined') endApi();
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

