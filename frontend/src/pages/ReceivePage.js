import React from 'react';
import Navigation from '../components/Navigation';

const ReceivePage = ({ user, onLogout }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="receive-page">
        <h1 className="text-4xl font-bold text-white mb-8" data-testid="receive-title">Receive AGT</h1>
        
        <div className="max-w-2xl mx-auto space-y-6">
          {/* World Chain Address */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="world-chain-receive">
            <h2 className="text-2xl font-semibold text-white mb-4">Your World Chain Address</h2>
            <p className="text-gray-300 mb-4">Share this address to receive AGT on World Chain</p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <div className="text-xl font-mono text-blue-400 break-all mb-4" data-testid="world-chain-address">
                {user.wallet_address}
              </div>
              <button
                onClick={() => copyToClipboard(user.wallet_address)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                data-testid="copy-world-chain-address"
              >
                Copy Address
              </button>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-white/5 rounded-lg p-8 flex items-center justify-center" data-testid="qr-code-placeholder">
              <div className="text-center text-gray-400">
                <svg className="w-32 h-32 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="8" height="8" rx="1" />
                  <rect x="14" y="2" width="8" height="8" rx="1" />
                  <rect x="2" y="14" width="8" height="8" rx="1" />
                  <rect x="16" y="16" width="2" height="2" />
                  <rect x="20" y="16" width="2" height="2" />
                  <rect x="16" y="20" width="2" height="2" />
                  <rect x="20" y="20" width="2" height="2" />
                </svg>
                <div className="text-sm">QR Code for {user.wallet_address}</div>
              </div>
            </div>
          </div>

          {/* Body AGT Email */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="body-agt-receive">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Email Address</h2>
            <p className="text-gray-300 mb-4">Receive AGT for Body transfers via email</p>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-xl text-purple-400 break-all mb-4" data-testid="email-address">
                {user.email}
              </div>
              <button
                onClick={() => copyToClipboard(user.email)}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                data-testid="copy-email-address"
              >
                Copy Email
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-200 text-sm">
              Note: Email transfers require verification before being credited to your account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivePage;