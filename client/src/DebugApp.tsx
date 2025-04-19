import { useState, useEffect } from 'react';

const DebugApp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      console.log('DebugApp mounted successfully');
      setLoaded(true);
    } catch (error) {
      console.error('Error in DebugApp:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '2rem auto', 
      padding: '2rem', 
      backgroundColor: 'white', 
      color: 'black',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1>Debug Mode</h1>
      {errorMessage ? (
        <div style={{ color: 'red', padding: '1rem', border: '1px solid red' }}>
          <p>Error occurred: {errorMessage}</p>
        </div>
      ) : (
        <p>App loaded successfully: {loaded ? 'Yes' : 'No'}</p>
      )}
    </div>
  );
};

export default DebugApp; 