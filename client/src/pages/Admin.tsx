import React, { useState, useRef, useEffect } from 'react';

const Admin = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [extensionInfo, setExtensionInfo] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch extension info when component loads and when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchExtensionInfo();
    }
  }, [isAuthenticated]);

  const fetchExtensionInfo = async () => {
    try {
      const response = await fetch('/api/extension-info');
      const data = await response.json();
      
      if (response.ok) {
        setExtensionInfo(data);
      }
    } catch (error) {
      console.error('Error fetching extension info:', error);
    }
  };

  // Simple authentication
  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Change this to your desired password
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadStatus('Please select a file first');
      return;
    }

    const file = fileInputRef.current.files[0];
    
    // Check if it's a ZIP file
    if (!file.name.endsWith('.zip')) {
      setUploadStatus('Please upload a ZIP file');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-extension', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      
      setUploadStatus('Upload successful! The extension file has been updated.');
      
      // Refresh extension info
      fetchExtensionInfo();
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page">
        <div className="page-content">
          <h1>Admin Login</h1>
          <div className="card">
            <div className="card-content">
              <form onSubmit={handleAuthentication} className="contact-form">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="button button-solid">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1>Extension Management</h1>
        <p>Upload your extension ZIP file here. This will replace the current downloadable extension file.</p>
        
        <div className="card">
          <div className="card-content">
            <h3>Upload Extension File</h3>
            <form onSubmit={handleFileUpload} className="contact-form">
              <div className="form-group">
                <label htmlFor="extensionFile">Extension ZIP File</label>
                <input
                  type="file"
                  id="extensionFile"
                  ref={fileInputRef}
                  accept=".zip"
                  disabled={isUploading}
                />
              </div>
              <button 
                type="submit" 
                className="button button-solid"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Extension'}
              </button>
              {uploadStatus && (
                <div className={`upload-status ${uploadStatus.includes('successful') ? 'success' : 'error'}`}>
                  {uploadStatus}
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-content">
            <h3>Current Download Links</h3>
            <p>These are the current download links for your extension:</p>
            <ul className="admin-links">
              <li>
                <strong>Direct Download:</strong> 
                <a href="/downloads/Sieve-NewsBiasChecker.zip" target="_blank" rel="noopener noreferrer">
                  /downloads/Sieve-NewsBiasChecker.zip
                </a>
              </li>
              <li>
                <strong>Chrome & Edge:</strong> 
                <span>Serving the file from the Download & Install section</span>
              </li>
              <li>
                <strong>Firefox:</strong> 
                <span>Serving the file from the Download & Install section</span>
              </li>
            </ul>
            
            {extensionInfo && extensionInfo.success && (
              <div className="extension-info">
                <h4>Extension File Details</h4>
                <p>
                  <strong>Last Updated:</strong> {new Date(extensionInfo.lastModified).toLocaleString()}
                </p>
                <p>
                  <strong>File Size:</strong> {Math.round(extensionInfo.size / 1024)} KB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 