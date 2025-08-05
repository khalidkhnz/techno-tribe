import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

export const uploadRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .input(z.object({ userId: z.string() }))
    .middleware(async ({ input }) => {
      return { userId: input.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile image uploaded:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  coverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .input(z.object({ userId: z.string() }))
    .middleware(async ({ input }) => {
      return { userId: input.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Cover image uploaded:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  resume: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .input(z.object({ 
      userId: z.string(),
      description: z.string().optional()
    }))
    .middleware(async ({ input }) => {
      return { 
        userId: input.userId,
        description: input.description 
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume uploaded:", file.url);
      return { 
        uploadedBy: metadata.userId, 
        description: metadata.description,
        url: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter; 