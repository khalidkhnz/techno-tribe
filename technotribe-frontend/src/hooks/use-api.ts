import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.auth.login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.setQueryData(["user"], data.data.user);
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.auth.register,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.setQueryData(["user"], data.data.user);
      toast.success("Registration successful!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useCompleteRecruiterProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.auth.completeRecruiterProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      toast.success("Recruiter profile completed successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to complete recruiter profile");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      queryClient.clear();
      toast.success("Logged out successfully");
    },
    onError: () => {
      // Even if logout fails, clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      queryClient.clear();
    },
  });
};

// User hooks
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: api.users.getProfile,
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: any }) => api.users.updateProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data);
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};

// Job hooks
export const useJobs = (filters?: any) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => api.jobs.getAll(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => api.jobs.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMyJobs = () => {
  return useQuery({
    queryKey: ["my-jobs"],
    queryFn: api.jobs.getMyJobs,
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useJobStats = () => {
  return useQuery({
    queryKey: ["job-stats"],
    queryFn: api.jobs.getStats,
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.jobs.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
      toast.success("Job created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create job");
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.jobs.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
      toast.success("Job updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.jobs.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
      toast.success("Job deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete job");
    },
  });
};

export const usePublishJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.jobs.publish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
      toast.success("Job published successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to publish job");
    },
  });
};

export const useCloseJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.jobs.close,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
      toast.success("Job closed successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to close job");
    },
  });
};

// Public Profile hooks
export const usePublicProfile = (customUrl: string) => {
  return useQuery({
    queryKey: ["public-profile", customUrl],
    queryFn: () => api.users.getPublicProfile(customUrl),
    enabled: !!customUrl,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
