const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const router = express.Router();

// Extension upload endpoint
router.post('/upload-extension', async (req, res) => {
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

    // Save the file as Sieve-NewsBiasChecker.zip in the downloads directory
    const uploadPath = path.join(__dirname, '..', 'public', 'downloads', 'Sieve-NewsBiasChecker.zip');
    
    // Make sure the directory exists
    await fs.ensureDir(path.dirname(uploadPath));
    
    // Move the file to the uploads directory
    await extensionFile.mv(uploadPath);
    
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      filename: 'Sieve-NewsBiasChecker.zip',
      path: '/downloads/Sieve-NewsBiasChecker.zip'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({
      success: false,
      message: `Error uploading file: ${error.message}`
    });
  }
});

// Get current extension file info
router.get('/extension-info', async (req, res) => {
  try {
    const extensionPath = path.join(__dirname, '..', 'public', 'downloads', 'Sieve-NewsBiasChecker.zip');
    const exists = await fs.pathExists(extensionPath);
    
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'Extension file not found'
      });
    }
    
    const stats = await fs.stat(extensionPath);
    
    return res.status(200).json({
      success: true,
      filename: 'Sieve-NewsBiasChecker.zip',
      path: '/downloads/Sieve-NewsBiasChecker.zip',
      size: stats.size,
      lastModified: stats.mtime
    });
  } catch (error) {
    console.error('Error getting extension info:', error);
    return res.status(500).json({
      success: false,
      message: `Error getting extension info: ${error.message}`
    });
  }
});

// Contact form submission endpoint
router.post('/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }
    
    // In a real application, you would save this to a database
    // and/or send an email notification
    console.log('Contact form submission:', { name, email, message });
    
    return res.status(200).json({
      success: true,
      message: 'Message received successfully'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      success: false,
      message: `Error processing contact form: ${error.message}`
    });
  }
});

module.exports = router; 