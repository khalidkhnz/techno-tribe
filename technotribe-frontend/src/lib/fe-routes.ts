const FRONTEND_ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    LOGIN: "/login",
    SIGNUP: "/signup",
    RECRUITER_SIGNUP: "/recruiter-signup",
    JOBS: "/jobs",
  
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
      JOBS: "/recruiter/jobs",
      PROFILE: "/recruiter/profile",
    },
  };
  
  export default FRONTEND_ROUTES;
  