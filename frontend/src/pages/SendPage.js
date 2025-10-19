import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SendPage = ({ user, onLogout }) => {
  const [coinType, setCoinType] = useState('world_chain');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await axios.post(`${API}/send/${user.id}`, {
        recipient_address: recipient,
        amount: parseFloat(amount),
        coin_type: coinType
      });
      setSuccess(true);
      setRecipient('');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error sending AGT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="send-page">
        <h1 className="text-4xl font-bold text-white mb-8" data-testid="send-title">Send AGT</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-200" data-testid="send-success">
                AGT sent successfully!
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200" data-testid="send-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-6" data-testid="send-form">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Coin Type</label>
                <select
                  value={coinType}
                  onChange={(e) => setCoinType(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  data-testid="coin-type-select"
                >
                  <option value="world_chain">AGT on World Chain</option>
                  <option value="body_agt">AGT for Body</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Address or Email</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter wallet address"
                  required
                  data-testid="recipient-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                  required
                  data-testid="amount-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                data-testid="send-button"
              >
                {loading ? 'Sending...' : 'Send AGT'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPage;