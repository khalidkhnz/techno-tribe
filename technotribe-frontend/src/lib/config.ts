export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    timeout: 10000,
  },

  // App Configuration
  app: {
    name: "TechnoTribe",
    description: "Connect talented developers with amazing opportunities",
    version: "1.0.0",
  },

  // Authentication
  auth: {
    tokenKey: "access_token",
    refreshTokenKey: "refresh_token",
    userKey: "user",
  },

  // Features
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    enableNotifications:
      process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS !== "false",
    enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === "true",
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // File Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  },

  // Job Posting
  jobs: {
    maxSkills: 20,
    maxDescriptionLength: 2000,
    salaryRange: {
      min: 0,
      max: 1000000,
    },
  },

  // UI Configuration
  ui: {
    sidebarWidth: 280,
    headerHeight: 64,
    borderRadius: "0.5rem",
    transitionDuration: "0.2s",
  },
} as const;

export type Config = typeof config;
