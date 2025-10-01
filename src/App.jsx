import React, { useState } from 'react';
import TokenManager from './components/TokenManager';
import Base64Encoder from './components/Base64Encoder';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('encoder');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🔐 Base64 Encoder & NPM Token Manager</h1>
        <p>Created by Adnan Al-Emran</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'encoder' ? 'active' : ''}`}
          onClick={() => setActiveTab('encoder')}
        >
          📝 Base64 Encoder
        </button>
        <button 
          className={`tab-button ${activeTab === 'token' ? 'active' : ''}`}
          onClick={() => setActiveTab('token')}
        >
          🔑 Token Manager
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'encoder' && <Base64Encoder />}
        {activeTab === 'token' && <TokenManager />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Base64 Encoder - ISC License</p>
      </footer>
    </div>
  );
}

export default App;