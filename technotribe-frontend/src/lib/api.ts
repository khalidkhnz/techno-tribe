import axios from "axios";
import { config } from "./config";
import FRONTEND_ROUTES from "./fe-routes";
import { RegisterFormData, ProfileFormData, CompleteRecruiterProfileFormData, CompleteDeveloperProfileFormData, JobFormData, ApplicationFormData, ApplicationStatusFormData } from "./schemas";

// Create axios instance
const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  // timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await axios.post(
            `${config.api.baseUrl}/auth/refresh`,
            { refresh_token: refreshToken }
          );

          const { access_token, refresh_token } = response.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = FRONTEND_ROUTES.LOGIN;
      }
    }

    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient.post("/auth/login", data),
    register: (data: RegisterFormData) => apiClient.post("/auth/signup", data),
    completeRecruiterProfile: (data: CompleteRecruiterProfileFormData) => 
      apiClient.put("/auth/complete-recruiter-profile", data),
    completeDeveloperProfile: (data: CompleteDeveloperProfileFormData) => 
      apiClient.put("/auth/complete-developer-profile", data),
    refresh: (data: { refresh_token: string }) =>
      apiClient.post("/auth/refresh", data),
    logout: () => apiClient.post("/auth/logout"),
  },

  // User endpoints
  users: {
    getProfile: () => apiClient.get("/users/profile"),
    updateProfile: (data: ProfileFormData) => apiClient.put("/users/profile", data),
    getPublicProfile: (customUrl: string) => apiClient.get(`/users/profile/${customUrl}`),
    getAll: () => apiClient.get("/users"),
    getById: (id: string) => apiClient.get(`/users/${id}`),
  },

  // Job endpoints
  jobs: {
    getAll: (params?: Record<string, unknown>) => apiClient.get("/jobs", { params }),
    getById: (id: string) => apiClient.get(`/jobs/${id}`),
    create: (data: JobFormData) => apiClient.post("/jobs", data),
    update: (id: string, data: JobFormData) => apiClient.put(`/jobs/${id}`, data),
    delete: (id: string) => apiClient.delete(`/jobs/${id}`),
    publish: (id: string) => apiClient.put(`/jobs/${id}/publish`),
    close: (id: string) => apiClient.put(`/jobs/${id}/close`),
    getMyJobs: () => apiClient.get("/jobs/my-jobs"),
    getStats: () => apiClient.get("/jobs/stats"),
  },

  // Application endpoints
  applications: {
    apply: (data: ApplicationFormData) => apiClient.post("/applications", data),
    getMyApplications: () => apiClient.get("/applications/my-applications"),
    getJobApplications: (jobId: string) => apiClient.get(`/applications/job/${jobId}`),
    updateStatus: (id: string, data: ApplicationStatusFormData) => 
      apiClient.put(`/applications/${id}/status`, data),
    markAsViewed: (id: string) => apiClient.put(`/applications/${id}/view`),
    withdraw: (id: string) => apiClient.put(`/applications/${id}/withdraw`),
    getById: (id: string) => apiClient.get(`/applications/${id}`),
  },
};
