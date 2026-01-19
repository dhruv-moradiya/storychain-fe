import axios, { AxiosHeaders } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import * as Sentry from '@sentry/react';

type GetToken = () => Promise<string | null>;
type SignOut = () => Promise<void>;

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
      Sentry.addBreadcrumb({
        category: 'http',
        message: `${config.method?.toUpperCase()} ${config.url}`,
        level: 'info',
        data: {
          url: config.url,
          method: config.method,
        },
      });

      const token = await getToken();

      if (token) {
        config.headers = AxiosHeaders.from(config.headers);
        config.headers.set('Authorization', `Bearer ${token}`);
      }

      return config;
    },
    (error) => {
      Sentry.captureException(error, {
        tags: { type: 'request_interceptor' },
      });
      return Promise.reject(error);
    }
  );

  // -------------------------
  // RESPONSE INTERCEPTOR
  // -------------------------
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      const config = error?.config;
      const data = error?.response?.data;

      if (status === 401) {
        Sentry.addBreadcrumb({
          category: 'auth',
          message: 'Unauthorized - redirecting to login',
          level: 'warning',
        });
        console.warn('🔒 Unauthorized → Redirecting to login');

        await signOut();

        const returnTo = window.location.pathname;
        window.location.href = `${redirectTo}?redirect=${encodeURIComponent(returnTo)}`;

        return;
      }

      // Capture 4xx and 5xx errors to Sentry
      if (status >= 400) {
        Sentry.withScope((scope) => {
          scope.setTag('http.status_code', status);
          scope.setTag('http.method', config?.method);
          scope.setContext('response', {
            status,
            url: config?.url,
            data: typeof data === 'string' ? data.substring(0, 500) : data,
          });

          // Only capture 5xx as errors, 4xx as warnings
          if (status >= 500) {
            Sentry.captureException(error);
          } else {
            Sentry.captureMessage(`HTTP ${status}: ${config?.url}`, 'warning');
          }
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
