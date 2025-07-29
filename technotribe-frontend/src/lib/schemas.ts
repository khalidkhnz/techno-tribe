import { z } from "zod";

// User registration schema
export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["developer", "recruiter"]),
  company: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// User login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Job creation schema
export const jobSchema = z
  .object({
    jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    employmentType: z.enum([
      "full-time",
      "part-time",
      "contract",
      "freelance",
      "internship",
    ]),
    location: z.string().min(2, "Location must be at least 2 characters"),
    experienceLevel: z.enum([
      "junior",
      "mid-level",
      "senior",
      "lead",
      "principal",
    ]),
    minimumSalary: z.number().min(0, "Minimum salary must be positive"),
    maximumSalary: z.number().min(0, "Maximum salary must be positive"),
    currency: z.string().min(1, "Currency is required"),
    requiredSkills: z
      .array(z.string())
      .min(1, "At least one skill is required"),
    jobDescription: z
      .string()
      .min(50, "Job description must be at least 50 characters"),
    isUrgent: z.boolean().optional(),
  })
  .refine((data) => data.maximumSalary >= data.minimumSalary, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["maximumSalary"],
  });

export type JobFormData = z.infer<typeof jobSchema>;

// Job filters schema
export const jobFiltersSchema = z.object({
  search: z.string().optional(),
  employmentType: z
    .enum(["full-time", "part-time", "contract", "freelance", "internship"])
    .optional(),
  experienceLevel: z
    .enum(["junior", "mid-level", "senior", "lead", "principal"])
    .optional(),
  skills: z.array(z.string()).optional(),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
});

export type JobFiltersFormData = z.infer<typeof jobFiltersSchema>;

// Profile update schema
export const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  customUrl: z.string().min(3, "Custom URL must be at least 3 characters").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid website URL").optional(),
  skills: z.array(z.string()).optional(),
  experienceLevel: z.enum([
    "junior",
    "mid-level", 
    "senior",
    "lead",
    "principal",
  ]).optional(),
  yearsOfExperience: z.number().min(0).max(50).optional(),
  currentCompany: z.string().optional(),
  currentPosition: z.string().optional(),
  education: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  portfolioLinks: z.array(z.string().url("Invalid URL")).optional(),
  socialLinks: z.array(z.string().url("Invalid URL")).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Application schema
export const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Application status update schema
export const applicationStatusSchema = z.object({
  status: z.enum([
    "applied",
    "reviewing", 
    "interviewing",
    "offered",
    "rejected",
    "withdrawn",
  ]),
});

export type ApplicationStatusFormData = z.infer<typeof applicationStatusSchema>;

// Complete recruiter profile schema
export const completeRecruiterProfileSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters"),
  companyWebsite: z.string().url("Invalid website URL").optional().or(z.literal("")),
  companyDescription: z.string().optional(),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
});

export type CompleteRecruiterProfileFormData = z.infer<typeof completeRecruiterProfileSchema>;

// Complete developer profile schema
export const completeDeveloperProfileSchema = z.object({
  customUrl: z.string().min(3, "Custom URL must be at least 3 characters").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experienceLevel: z.enum([
    "junior",
    "mid-level",
    "senior",
    "lead",
    "principal",
  ]).optional(),
  yearsOfExperience: z.number().min(0).max(50).optional(),
  currentCompany: z.string().optional(),
  currentPosition: z.string().optional(),
  education: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  portfolioLinks: z.array(z.string().url("Invalid URL")).optional(),
  socialLinks: z.array(z.string().url("Invalid URL")).optional(),
});

export type CompleteDeveloperProfileFormData = z.infer<typeof completeDeveloperProfileSchema>;
