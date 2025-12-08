import axios, { AxiosHeaders } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { GetToken, SignOut } from '@clerk/types';

export function createAxiosInspector(
  getToken: GetToken,
  signOut: SignOut,
  redirectTo: string = '/sign-in'
): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000,
  });

  // -------------------------
  // REQUEST INTERCEPTOR
  // -------------------------
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getToken();

      if (token) {
        config.headers = AxiosHeaders.from(config.headers);
        config.headers.set('Authorization', `Bearer ${token}`);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // -------------------------
  // RESPONSE INTERCEPTOR
  // -------------------------
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        console.warn('🔒 Unauthorized → Redirecting to login');

        await signOut();

        const returnTo = window.location.pathname;
        window.location.href = `${redirectTo}?redirect=${encodeURIComponent(returnTo)}`;

        return;
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
