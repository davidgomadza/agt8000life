import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PurchasePage = ({ user, onLogout }) => {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [purchaseId, setPurchaseId] = useState(null);
  const navigate = useNavigate();

  const pricePerAGT = 100;
  const totalPrice = amount * pricePerAGT;

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/purchase/${user.id}`, { amount });
      setPurchaseId(response.data.id);
    } catch (err) {
      console.error('Error creating purchase:', err);
      alert('Error creating purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="purchase-page">
        <h1 className="text-4xl font-bold text-white mb-8" data-testid="purchase-title">Purchase AGT</h1>
        
        {!purchaseId ? (
          <div className="max-w-2xl mx-auto">
            {/* Purchase Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-6" data-testid="purchase-form">
              <h2 className="text-2xl font-semibold text-white mb-6">Quick Purchase</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount of AGT to Purchase</label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-2xl font-semibold focus:outline-none focus:border-blue-500 transition-colors"
                  data-testid="amount-input"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>Price per AGT:</span>
                  <span className="font-semibold" data-testid="price-per-agt">${pricePerAGT} USD</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total Price:</span>
                  <span data-testid="total-price">${totalPrice} USD</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                <div className="text-sm text-blue-200 mb-1">Payment Method:</div>
                <div className="text-lg font-semibold text-white">PayPal</div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading || amount < 1}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                data-testid="create-purchase-button"
              >
                {loading ? 'Creating Request...' : 'Create Purchase Request'}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto" data-testid="payment-instructions">
            {/* Payment Instructions */}
            <div className="bg-green-500/20 border border-green-500 rounded-xl p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-white">Purchase Request Created!</h2>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Payment Instructions</h3>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Step 1:</div>
                  <div>Send ${totalPrice} USD to PayPal account:</div>
                  <div className="text-xl font-mono text-blue-400 mt-2" data-testid="paypal-email">
                    davidgomadza@hotmail.com
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Step 2:</div>
                  <div>Include your purchase ID in the payment note:</div>
                  <div className="text-lg font-mono text-purple-400 mt-2" data-testid="purchase-id">
                    {purchaseId}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Step 3:</div>
                  <div>After payment, submit proof of purchase to activate your Body AGT</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-6">
              <div className="text-yellow-200 text-sm">
                <strong>Important:</strong> Body AGT is only activated after proof of purchase verification. Please submit your PayPal receipt and transaction screenshot.
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/proof')}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all"
                data-testid="submit-proof-button"
              >
                Submit Proof of Purchase
              </button>
              <button
                onClick={() => setPurchaseId(null)}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                data-testid="new-purchase-button"
              >
                Create New Purchase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasePage;