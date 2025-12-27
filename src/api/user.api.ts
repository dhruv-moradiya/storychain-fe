import type { AxiosInstance } from 'axios';
import type { IAuthUser, ISearchUserByUsername, IPublicViewUser } from '@/type/user';

// Request payload types
interface ISearchUserPayload {
  username: string;
}

interface IUpdateProfilePayload {
  bio?: string;
  avatarUrl?: string;
}

interface IUpdatePreferencesPayload {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

// User API factory
const userApi = (api: AxiosInstance) => ({
  // ===== QUERIES =====

  getMe: async () => {
    const res = await api.get<IAuthUser>('/users/me');
    return res.data.data;
  },

  getById: async (userId: string) => {
    const res = await api.get<{ success: boolean; message: string; data: IPublicViewUser }>(
      `/users/id/${userId}`
    );
    return res.data.data;
  },

  getByUsername: async (username: string) => {
    const res = await api.get<{ success: boolean; message: string; data: IPublicViewUser }>(
      `/users/username/${username}`
    );
    return res.data.data;
  },

  searchByUsername: async (payload: ISearchUserPayload): Promise<IPublicViewUser[]> => {
    const res = await api.post<ISearchUserByUsername>('/users/search', payload);
    return res.data.data;
  },

  // ===== MUTATIONS =====

  updateProfile: async (payload: IUpdateProfilePayload) => {
    const res = await api.patch<{ success: boolean; message: string; data: IPublicViewUser }>(
      '/users/me/profile',
      payload
    );
    return res.data.data;
  },

  updatePreferences: async (payload: IUpdatePreferencesPayload) => {
    const res = await api.patch<{ success: boolean; message: string; data: IPublicViewUser }>(
      '/users/me/preferences',
      payload
    );
    return res.data.data;
  },
});

// Export types for external use
export type { ISearchUserPayload, IUpdateProfilePayload, IUpdatePreferencesPayload };

export { userApi };
