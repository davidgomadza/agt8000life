import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WalletPage = ({ user, onLogout }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const response = await axios.get(`${API}/wallet/${user.id}`);
      setWallet(response.data);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <Navigation user={user} onLogout={onLogout} />
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Loading wallet...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="wallet-page">
        <h1 className="text-4xl font-bold text-white mb-8" data-testid="wallet-title">My AGT Wallet</h1>
        
        {/* Wallet Address */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6" data-testid="wallet-address-card">
          <div className="text-sm text-gray-300 mb-2">Your Wallet Address</div>
          <div className="text-2xl font-mono text-white break-all" data-testid="wallet-address">{wallet?.wallet_address}</div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* World Chain AGT */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 card-hover" data-testid="world-chain-balance-card">
            <div className="text-sm text-blue-200 mb-2">AGT on World Chain</div>
            <div className="text-5xl font-bold text-white mb-4" data-testid="world-chain-balance">
              {wallet?.world_chain_balance?.toFixed(2)}
            </div>
            <div className="text-sm text-blue-200">Cryptocurrency Token</div>
          </div>

          {/* Body AGT */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-8 card-hover" data-testid="body-agt-balance-card">
            <div className="text-sm text-purple-200 mb-2">AGT for Body</div>
            <div className="text-5xl font-bold text-white mb-4" data-testid="body-agt-balance">
              {wallet?.body_agt_balance?.toFixed(2)}
            </div>
            <div className="text-sm text-purple-200">Life Extension Technology</div>
          </div>
        </div>

        {/* Activation Status */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8" data-testid="activation-status-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-300 mb-2">Activation Status</div>
              <div className="text-xl font-semibold text-white" data-testid="activation-status">
                {wallet?.activation_status}
              </div>
            </div>
            {wallet?.body_agt_balance < 8000 && (
              <div className="text-right">
                <div className="text-sm text-gray-300 mb-1">Progress to Full Activation</div>
                <div className="text-2xl font-bold text-blue-400">
                  {((wallet?.body_agt_balance / 8000) * 100).toFixed(1)}%
                </div>
              </div>
            )}
          </div>
          {wallet?.body_agt_balance === 0 && (
            <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-200 text-sm">
              Purchase and verify AGT to activate life extension technology
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="wallet-actions">
          <Link
            to="/send"
            className="py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-center transition-all transform hover:scale-105"
            data-testid="send-agt-button"
          >
            Send AGT
          </Link>
          <Link
            to="/receive"
            className="py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold text-center transition-all transform hover:scale-105"
            data-testid="receive-agt-button"
          >
            Receive AGT
          </Link>
          <Link
            to="/purchase"
            className="py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold text-center transition-all transform hover:scale-105"
            data-testid="purchase-button"
          >
            Purchase AGT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;