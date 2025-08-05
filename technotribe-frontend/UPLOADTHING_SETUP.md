# UploadThing Setup Guide

This project uses UploadThing for file uploads (Profile Images, Cover Images, and Resumes).

## Setup Instructions

1. **Create an UploadThing Account**
   - Go to [uploadthing.com](https://uploadthing.com)
   - Sign up for a free account

2. **Create a New App**
   - Create a new app in your UploadThing dashboard
   - Note down your `APP_ID` and `SECRET`

3. **Configure Environment Variables**
   - Update `.env.local` with your actual UploadThing credentials:
   ```env
   UPLOADTHING_SECRET=your_actual_secret_here
   UPLOADTHING_APP_ID=your_actual_app_id_here
   ```

4. **File Upload Features**
   - **Profile Images**: JPG, PNG, WebP (max 4MB)
   - **Cover Images**: JPG, PNG, WebP (max 4MB)
   - **Resumes**: PDF only (max 8MB, expires in 3 months)

## Implementation Details

- **Frontend**: Uses UploadThing React hooks (`useUploadThing`) for file uploads
- **Backend**: Receives public URLs from UploadThing and stores them in the database
- **File Router**: Configured in `/src/app/api/uploadthing/core.ts`
- **API Routes**: Handled by `/src/app/api/uploadthing/route.ts`

## Usage

The file upload functionality is implemented in `/src/app/(private)/developer/profile/page.tsx`:

1. **Profile Image Upload**: Click "Upload Profile Image" button
2. **Cover Image Upload**: Click "Upload Cover Image" button  
3. **Resume Upload**: Click "Upload Resume" button and optionally add a description

All uploads are handled automatically with progress indicators and error handling. 