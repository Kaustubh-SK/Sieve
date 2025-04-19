# Sieve Browser Extension Server

A simple Express.js server for hosting and managing the Sieve Browser Extension files.

## Features

- Serving the extension ZIP file for direct download
- Upload endpoint for admin to update the extension file
- Contact form submission endpoint
- Simple API for extension file information

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. For production:
   ```
   npm start
   ```

## API Endpoints

- `GET /downloads/Sieve-NewsBiasChecker.zip`: Download the extension file
- `POST /api/upload-extension`: Upload a new version of the extension
- `GET /api/extension-info`: Get information about the current extension file
- `POST /api/contact`: Process contact form submissions
- `GET /health`: Health check endpoint

## Directory Structure

- `/public/downloads/`: Contains the extension ZIP file
- `/server.js`: Main server file 