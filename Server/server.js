const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // logging
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
}));

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'public', 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Add a placeholder extension file if it doesn't exist
const dummyExtensionPath = path.join(downloadsDir, 'Sieve-NewsBiasChecker.zip');
if (!fs.existsSync(dummyExtensionPath)) {
  // Create a simple placeholder ZIP file
  try {
    // Create a simple text file
    const tempFilePath = path.join(downloadsDir, 'placeholder.txt');
    fs.writeFileSync(tempFilePath, 'This is a placeholder extension file.');
    
    console.log('Created placeholder extension file');
  } catch (err) {
    console.error('Error creating placeholder extension:', err);
  }
}

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly serve the downloads directory
app.use('/downloads', express.static(path.join(__dirname, 'public', 'downloads')));

// API endpoint for file upload (admin use)
app.post('/api/upload-extension', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded'
      });
    }

    const extensionFile = req.files.file;
    
    // Check if it's a zip file
    if (!extensionFile.name.endsWith('.zip')) {
      return res.status(400).json({
        success: false,
        message: 'Only ZIP files are allowed'
      });
    }

    const uploadPath = path.join(__dirname, 'public', 'downloads', 'Sieve-NewsBiasChecker.zip');
    
    // Move the file to the downloads directory
    extensionFile.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `Failed to upload file: ${err.message}`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        filename: 'Sieve-NewsBiasChecker.zip',
        path: '/downloads/Sieve-NewsBiasChecker.zip'
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

// API endpoint to get extension info
app.get('/api/extension-info', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'downloads', 'Sieve-NewsBiasChecker.zip');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Extension file not found'
      });
    }
    
    const stats = fs.statSync(filePath);
    
    return res.status(200).json({
      success: true,
      filename: 'Sieve-NewsBiasChecker.zip',
      path: '/downloads/Sieve-NewsBiasChecker.zip',
      size: stats.size,
      lastModified: stats.mtime
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }
    
    // In a real application, you would save this to a database or send an email
    console.log('Contact form submission:', { name, email, message });
    
    return res.status(200).json({
      success: true,
      message: 'Message received successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Extension can be downloaded at: http://localhost:${PORT}/downloads/Sieve-NewsBiasChecker.zip`);
}); 