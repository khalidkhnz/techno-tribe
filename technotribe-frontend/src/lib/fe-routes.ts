const FRONTEND_ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    LOGIN: "/login",
    SIGNUP: "/signup",
    COMPLETE_RECRUITER_PROFILE: "/complete-recruiter-profile",
    COMPLETE_DEVELOPER_PROFILE: "/complete-developer-profile",
    JOBS: "/jobs",
    JOB_DETAIL: (id: string) => `/jobs/${id}`,
  
    PROFILE_CUSTOM_URL: (customUrl: string) => `/profile/${customUrl}`,
  
    ADMIN: {
      BASE: "/admin",
      DASHBOARD: "/admin/dashboard",
      ANALYTICS: "/admin/analytics",
      JOBS: "/admin/jobs",
      USERS: "/admin/users",
      PROFILE: "#"
    },
  
    DEVELOPER: {
      BASE: "/developer",
      DASHBOARD: "/developer/dashboard",
      APPLICATIONS: "/developer/applications",
      PROFILE: "/developer/profile",
    },
  
    RECRUITER: {
      BASE: "/recruiter",
      DASHBOARD: "/recruiter/dashboard",
      JOBS: {
        BASE: "/recruiter/jobs",
        POST_JOB: "/recruiter/jobs/new",
      },
      PROFILE: "/recruiter/profile",
    },
  };
  
  export default FRONTEND_ROUTES;
  