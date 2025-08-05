import type { OurFileRouter } from "@/app/api/uploadthing/core";

// UploadThing configuration
export const uploadThingConfig = {
  secret: process.env.UPLOADTHING_SECRET || "your_uploadthing_secret_here",
  appId: process.env.UPLOADTHING_APP_ID || "your_uploadthing_app_id_here",
}; 