import React, { useState } from 'react';

const Base64Encoder = () => {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [mode, setMode] = useState('encode');

  const handleEncode = () => {
    try {
      const encoded = btoa(inputText);
      setEncodedText(encoded);
    } catch (error) {
      alert('Error encoding text: ' + error.message);
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(inputText);
      setDecodedText(decoded);
    } catch (error) {
      alert('Error decoding text: Invalid Base64 string');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const clearAll = () => {
    setInputText('');
    setEncodedText('');
    setDecodedText('');
  };

  return (
    <div className="base64-encoder">
      <div className="encoder-header">
        <h2>🔄 Base64 Encoder/Decoder</h2>
        <div className="mode-selector">
          <label>
            <input
              type="radio"
              value="encode"
              checked={mode === 'encode'}
              onChange={(e) => setMode(e.target.value)}
            />
            Encode
          </label>
          <label>
            <input
              type="radio"
              value="decode"
              checked={mode === 'decode'}
              onChange={(e) => setMode(e.target.value)}
            />
            Decode
          </label>
        </div>
      </div>

      <div className="input-section">
        <label htmlFor="input-text">
          {mode === 'encode' ? 'Text to Encode:' : 'Base64 to Decode:'}
        </label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          rows="4"
        />
        <div className="button-group">
          <button 
            onClick={mode === 'encode' ? handleEncode : handleDecode}
            disabled={!inputText.trim()}
            className="primary-button"
          >
            {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
          </button>
          <button onClick={clearAll} className="secondary-button">
            🗑️ Clear All
          </button>
        </div>
      </div>

      {mode === 'encode' && encodedText && (
        <div className="output-section">
          <label>Encoded Result:</label>
          <div className="output-container">
            <textarea
              value={encodedText}
              readOnly
              rows="3"
              className="output-text"
            />
            <button 
              onClick={() => copyToClipboard(encodedText)}
              className="copy-button"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>
      )}

      {mode === 'decode' && decodedText && (
        <div className="output-section">
          <label>Decoded Result:</label>
          <div className="output-container">
            <textarea
              value={decodedText}
              readOnly
              rows="3"
              className="output-text"
            />
            <button 
              onClick={() => copyToClipboard(decodedText)}
              className="copy-button"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>ℹ️ About Base64 Encoding</h3>
        <p>
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
          It's commonly used for encoding data in email, storing complex data in XML, and web applications.
        </p>
        <ul>
          <li><strong>Encode:</strong> Convert text to Base64 format</li>
          <li><strong>Decode:</strong> Convert Base64 back to original text</li>
          <li><strong>Use Cases:</strong> Data transmission, storage, authentication tokens</li>
        </ul>
      </div>
    </div>
  );
};

export default Base64Encoder;