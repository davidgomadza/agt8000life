import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProofPage = ({ user, onLogout }) => {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState('');
  const [receipt, setReceipt] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPurchases();
    fetchSubmissions();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`${API}/purchases/${user.id}`);
      setPurchases(response.data.filter(p => p.status === 'pending'));
    } catch (err) {
      console.error('Error fetching purchases:', err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`${API}/proof/status/${user.id}`);
      setSubmissions(response.data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('purchase_id', selectedPurchase);
      formData.append('receipt', receipt);
      formData.append('screenshot', screenshot);

      await axios.post(`${API}/proof/submit/${user.id}`, formData);
      setSuccess(true);
      setSelectedPurchase('');
      setReceipt('');
      setScreenshot('');
      fetchPurchases();
      fetchSubmissions();
    } catch (err) {
      console.error('Error submitting proof:', err);
      alert('Error submitting proof. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="proof-page">
        <h1 className="text-4xl font-bold text-white mb-8" data-testid="proof-title">Proof of Purchase</h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Submit New Proof */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="submit-proof-form">
            <h2 className="text-2xl font-semibold text-white mb-6">Submit New Proof</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-200" data-testid="submit-success">
                Proof submitted successfully! Your purchase will be verified within 24-48 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Purchase</label>
                <select
                  value={selectedPurchase}
                  onChange={(e) => setSelectedPurchase(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  data-testid="purchase-select"
                >
                  <option value="">Choose a pending purchase...</option>
                  {purchases.map(purchase => (
                    <option key={purchase.id} value={purchase.id}>
                      {purchase.amount} AGT - ${purchase.total_price} (ID: {purchase.id.substring(0, 8)}...)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Receipt/Confirmation</label>
                <textarea
                  value={receipt}
                  onChange={(e) => setReceipt(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors h-24"
                  placeholder="Paste your PayPal transaction ID or details"
                  required
                  data-testid="receipt-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Screenshot (Optional)</label>
                <textarea
                  value={screenshot}
                  onChange={(e) => setScreenshot(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors h-24"
                  placeholder="Description or image URL"
                  data-testid="screenshot-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !selectedPurchase}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                data-testid="submit-proof-button"
              >
                {loading ? 'Submitting...' : 'Submit Proof'}
              </button>
            </form>
          </div>

          {/* Requirements */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="proof-requirements">
            <h3 className="text-xl font-semibold text-white mb-4">Requirements</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Clear PayPal receipt or confirmation email
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Transaction screenshot (optional but recommended)
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Payment amount must match purchase total
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Payment sent to: davidgomadza@hotmail.com
              </li>
            </ul>
          </div>

          {/* Verification Timeline */}
          <div className="bg-blue-500/20 border border-blue-500 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Verification Timeline</h3>
            <p className="text-gray-300 text-sm">
              Verification typically takes 24-48 hours. You will be notified via email once your proof has been reviewed and your Body AGT has been activated.
            </p>
          </div>

          {/* Your Submissions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="submission-history">
            <h3 className="text-xl font-semibold text-white mb-4">Your Submissions</h3>
            {submissions.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No submissions yet</div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission, index) => (
                  <div
                    key={submission.id}
                    className="bg-white/5 rounded-lg p-4"
                    data-testid={`submission-${index}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-gray-400">
                        Purchase ID: {submission.purchase_id.substring(0, 8)}...
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : submission.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {submission.status}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      Submitted: {new Date(submission.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofPage;