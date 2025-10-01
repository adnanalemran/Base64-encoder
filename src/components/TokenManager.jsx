import React, { useState, useEffect } from 'react';

const TokenManager = () => {
  const [token, setToken] = useState('');
  const [registry, setRegistry] = useState('https://registry.npmjs.org/');
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedTokens, setSavedTokens] = useState([]);

  useEffect(() => {
    // Load saved tokens from localStorage
    const saved = localStorage.getItem('savedTokens');
    if (saved) {
      setSavedTokens(JSON.parse(saved));
    }
  }, []);

  const saveToken = () => {
    if (!token.trim()) {
      alert('Please enter a token');
      return;
    }

    const tokenData = {
      id: Date.now(),
      token: token.trim(),
      registry: registry,
      created: new Date().toISOString(),
      name: `Token-${Date.now()}`
    };

    const updatedTokens = [...savedTokens, tokenData];
    setSavedTokens(updatedTokens);
    localStorage.setItem('savedTokens', JSON.stringify(updatedTokens));
    
    alert('Token saved successfully!');
  };

  const loadToken = (tokenData) => {
    setToken(tokenData.token);
    setRegistry(tokenData.registry);
  };

  const deleteToken = (id) => {
    const updatedTokens = savedTokens.filter(t => t.id !== id);
    setSavedTokens(updatedTokens);
    localStorage.setItem('savedTokens', JSON.stringify(updatedTokens));
  };

  const testToken = async () => {
    if (!token.trim()) {
      alert('Please enter a token to test');
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      // Simulate NPM registry authentication test
      const response = await fetch(`${registry}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setTestResult({
          success: true,
          message: 'Token authentication successful!',
          status: response.status,
          timestamp: new Date().toLocaleString()
        });
      } else {
        setTestResult({
          success: false,
          message: `Authentication failed: ${response.status} ${response.statusText}`,
          status: response.status,
          timestamp: new Date().toLocaleString()
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Network error: ${error.message}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateNpmrcContent = () => {
    if (!token.trim() || !registry.trim()) {
      alert('Please enter both token and registry URL');
      return;
    }

    const registryHost = new URL(registry).hostname;
    const npmrcContent = `${registryHost}/:_authToken=${token}
registry=${registry}`;
    
    return npmrcContent;
  };

  const downloadNpmrc = () => {
    const content = generateNpmrcContent();
    if (!content) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.npmrc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyNpmrcContent = () => {
    const content = generateNpmrcContent();
    if (!content) return;

    navigator.clipboard.writeText(content).then(() => {
      alert('NPM configuration copied to clipboard!');
    });
  };

  return (
    <div className="token-manager">
      <div className="token-header">
        <h2>🔑 NPM Token Manager</h2>
        <p>Manage and test your NPM authentication tokens</p>
      </div>

      <div className="token-input-section">
        <div className="input-group">
          <label htmlFor="registry">NPM Registry URL:</label>
          <input
            type="url"
            id="registry"
            value={registry}
            onChange={(e) => setRegistry(e.target.value)}
            placeholder="https://registry.npmjs.org/"
          />
        </div>

        <div className="input-group">
          <label htmlFor="token">Authentication Token:</label>
          <textarea
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            rows="3"
            className="token-input"
          />
        </div>

        <div className="button-group">
          <button 
            onClick={testToken} 
            disabled={isLoading || !token.trim()}
            className="primary-button"
          >
            {isLoading ? '⏳ Testing...' : '🧪 Test Token'}
          </button>
          <button 
            onClick={saveToken}
            disabled={!token.trim()}
            className="secondary-button"
          >
            💾 Save Token
          </button>
        </div>
      </div>

      {testResult && (
        <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
          <h3>{testResult.success ? '✅ Success' : '❌ Failed'}</h3>
          <p>{testResult.message}</p>
          {testResult.status && <p>Status Code: {testResult.status}</p>}
          <small>Tested at: {testResult.timestamp}</small>
        </div>
      )}

      <div className="npmrc-section">
        <h3>📄 Generate .npmrc Configuration</h3>
        <p>Generate NPM configuration file with your token settings</p>
        <div className="button-group">
          <button 
            onClick={copyNpmrcContent}
            disabled={!token.trim() || !registry.trim()}
            className="secondary-button"
          >
            📋 Copy .npmrc Content
          </button>
          <button 
            onClick={downloadNpmrc}
            disabled={!token.trim() || !registry.trim()}
            className="secondary-button"
          >
            💾 Download .npmrc
          </button>
        </div>
      </div>

      {savedTokens.length > 0 && (
        <div className="saved-tokens-section">
          <h3>💾 Saved Tokens</h3>
          <div className="tokens-list">
            {savedTokens.map((tokenData) => (
              <div key={tokenData.id} className="token-item">
                <div className="token-info">
                  <strong>{tokenData.name}</strong>
                  <small>Created: {new Date(tokenData.created).toLocaleString()}</small>
                  <small>Registry: {tokenData.registry}</small>
                  <small>Token: {tokenData.token.substring(0, 20)}...</small>
                </div>
                <div className="token-actions">
                  <button 
                    onClick={() => loadToken(tokenData)}
                    className="load-button"
                    title="Load this token"
                  >
                    📤
                  </button>
                  <button 
                    onClick={() => deleteToken(tokenData.id)}
                    className="delete-button"
                    title="Delete this token"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>ℹ️ About NPM Tokens</h3>
        <ul>
          <li><strong>Authentication:</strong> NPM tokens authenticate you with private registries</li>
          <li><strong>Security:</strong> Never share your tokens publicly</li>
          <li><strong>Scope:</strong> Tokens can have different permission levels</li>
          <li><strong>Expiration:</strong> Some tokens may have expiration dates</li>
        </ul>
      </div>
    </div>
  );
};

export default TokenManager;