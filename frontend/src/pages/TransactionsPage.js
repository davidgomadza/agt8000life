import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TransactionsPage = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API}/transactions/${user.id}`);
      setTransactions(response.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'world_chain') return tx.coin_type === 'world_chain';
    if (filter === 'body_agt') return tx.coin_type === 'body_agt';
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="transactions-page">
        <h1 className="text-4xl font-bold text-white mb-8" data-testid="transactions-title">Transaction History</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6" data-testid="transaction-filters">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              data-testid="filter-all"
            >
              All
            </button>
            <button
              onClick={() => setFilter('world_chain')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'world_chain'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              data-testid="filter-world-chain"
            >
              World Chain
            </button>
            <button
              onClick={() => setFilter('body_agt')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'body_agt'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              data-testid="filter-body-agt"
            >
              Body AGT
            </button>
          </div>

          {/* Transactions List */}
          {loading ? (
            <div className="text-center text-white py-12">Loading transactions...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 text-center" data-testid="no-transactions">
              <div className="text-6xl mb-4">📭</div>
              <div className="text-xl text-white mb-2">No transactions yet</div>
              <div className="text-gray-400">Your transaction history will appear here</div>
            </div>
          ) : (
            <div className="space-y-4" data-testid="transactions-list">
              {filteredTransactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover"
                  data-testid={`transaction-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tx.coin_type === 'world_chain'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {tx.coin_type === 'world_chain' ? 'World Chain' : 'Body AGT'}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tx.from_user_id === user.id
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {tx.from_user_id === user.id ? 'Sent' : 'Received'}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>
                          <span className="font-medium">From:</span> {tx.from_address}
                        </div>
                        <div>
                          <span className="font-medium">To:</span> {tx.to_address}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {formatDate(tx.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        tx.from_user_id === user.id ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {tx.from_user_id === user.id ? '-' : '+'}{tx.amount}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">AGT</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;