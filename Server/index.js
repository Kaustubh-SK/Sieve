require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs-extra');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB max file size
  },
}));

// Create a public downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'public', 'downloads');
fs.ensureDirSync(downloadsDir);

// Static files - serve the downloads folder
app.use('/downloads', express.static(path.join(__dirname, 'public', 'downloads')));

// API Routes
app.use('/api', require('./routes/api'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 