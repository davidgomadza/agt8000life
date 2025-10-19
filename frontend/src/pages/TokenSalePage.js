import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const TokenSalePage = ({ user, onLogout }) => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');

  const btcgtPackages = [
    { name: 'BTCGT x1', price: 8, quantity: '1000000', label: 'Single Token Starter Pack', highlight: false },
    { name: 'BTCGT x4', price: 32, quantity: '20000', label: 'Standard Pack', highlight: false },
    { name: 'BTCGT x8', price: 64, quantity: '20000', label: 'Value Pack', highlight: false },
    { name: 'BTCGT x10', price: 80, quantity: '20000', label: 'Bonus Pack', highlight: false },
    { name: 'BTCGT x15', price: 120, quantity: '20000', label: 'Investor Pack', highlight: false },
    { name: 'BTCGT x20', price: 160, quantity: '10000', label: 'Silver Tier', highlight: false },
    { name: 'BTCGT x25', price: 200, quantity: '10000', label: 'Gold Tier', highlight: false },
    { name: 'BTCGT x40', price: 320, quantity: '10000', label: 'Pro Tier', highlight: false },
    { name: 'BTCGT x50', price: 400, quantity: '5000', label: 'Best Value!', highlight: 'yellow' },
    { name: 'BTCGT x75', price: 600, quantity: '3000', label: 'Premium Tier', highlight: false },
    { name: 'BTCGT x100', price: 800, quantity: '2000', label: 'Elite Max Pack', highlight: 'green' }
  ];

  const btcytPackages = [
    { name: 'BTCYT x1', price: 8, quantity: '1000000', label: 'Single Token Starter Pack', highlight: false },
    { name: 'BTCYT x4', price: 32, quantity: '20000', label: 'Standard Pack', highlight: false },
    { name: 'BTCYT x8', price: 64, quantity: '20000', label: 'Value Pack', highlight: false },
    { name: 'BTCYT x10', price: 80, quantity: '20000', label: 'Bonus Pack', highlight: false },
    { name: 'BTCYT x15', price: 120, quantity: '20000', label: 'Investor Pack', highlight: false },
    { name: 'BTCYT x20', price: 160, quantity: '10000', label: 'Silver Tier', highlight: false },
    { name: 'BTCYT x25', price: 200, quantity: '10000', label: 'Gold Tier', highlight: false },
    { name: 'BTCYT x40', price: 320, quantity: '10000', label: 'Pro Tier', highlight: false },
    { name: 'BTCYT x50', price: 400, quantity: '5000', label: 'Best Value!', highlight: false },
    { name: 'BTCYT x75', price: 600, quantity: '3000', label: 'Premium Tier', highlight: false },
    { name: 'BTCYT x100', price: 800, quantity: '2000', label: 'Elite Max Pack', highlight: false }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment processing is simulated. Please contact us at the provided payment addresses.');
  };

  const getCardStyle = (highlight) => {
    if (highlight === 'yellow') {
      return 'bg-yellow-500/20 border-yellow-500';
    } else if (highlight === 'green') {
      return 'bg-green-500/20 border-green-500';
    }
    return 'bg-white/10 border-blue-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="token-sale-page">
        {/* Header */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="token-sale-title">
            BITCOIN AGT & BITCOINAYT Token Sale
          </h1>
          <p className="text-xl text-gray-200">
            Secure Your Exclusive Digital Assets Today. Limited Quantities Available!
          </p>
        </div>

        {/* BTCGT Section */}
        <div className="mb-16" data-testid="btcgt-section">
          <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">
            BITCOIN AGT (BTCGT) Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {btcgtPackages.map((pkg, index) => (
              <div
                key={index}
                className={`${getCardStyle(pkg.highlight)} backdrop-blur-md rounded-xl p-6 text-center card-hover border-2`}
                data-testid={`btcgt-package-${index}`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-green-400 my-3">
                  ${pkg.price}
                </div>
                <div className="text-red-400 text-sm font-bold mb-2">
                  ({pkg.quantity})
                </div>
                <div className="text-gray-300 text-sm">
                  {pkg.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BTCYT Section */}
        <div className="mb-16" data-testid="btcyt-section">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">
            BITCOINAYT (BTCYT) Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {btcytPackages.map((pkg, index) => (
              <div
                key={index}
                className="bg-cyan-500/20 border-2 border-cyan-400 backdrop-blur-md rounded-xl p-6 text-center card-hover"
                data-testid={`btcyt-package-${index}`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-green-400 my-3">
                  ${pkg.price}
                </div>
                <div className="text-red-400 text-sm font-bold mb-2">
                  ({pkg.quantity})
                </div>
                <div className="text-gray-300 text-sm">
                  {pkg.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-blue-500 mb-12" />

        {/* Order Form */}
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 border-2 border-dashed border-blue-400" data-testid="order-form">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Place Your Order and Select Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-300 font-semibold mb-2">
                Select Your Token Package:
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-blue-400 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
                data-testid="package-select"
              >
                <option value="">-- Choose a BTCGT or BTCYT Package --</option>
                <optgroup label="BITCOIN AGT (BTCGT)">
                  {btcgtPackages.map((pkg, index) => (
                    <option key={index} value={`${pkg.name}-${pkg.price}`}>
                      {pkg.name} - US${pkg.price}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="BITCOINAYT (BTCYT)">
                  {btcytPackages.map((pkg, index) => (
                    <option key={index} value={`${pkg.name}-${pkg.price}`}>
                      {pkg.name} - US${pkg.price}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-blue-300 font-semibold mb-2">
                Or, Enter Custom US$ Amount (Min $8.00):
              </label>
              <input
                type="text"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="e.g., 250 (will be fulfilled with nearest package)"
                className="w-full px-4 py-3 bg-white/10 border border-blue-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                data-testid="custom-amount-input"
              />
            </div>

            <div>
              <label className="block text-blue-300 font-semibold mb-2">
                Your Contact Email (Required for delivery):
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 bg-white/10 border border-blue-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                data-testid="email-input"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-xl font-bold transition-all transform hover:scale-105 uppercase"
              data-testid="pay-now-button"
            >
              Pay Now & Get Tokens
            </button>
          </form>

          {/* Payment Details */}
          <div className="mt-8 bg-gray-700/30 rounded-lg p-6" data-testid="payment-details">
            <h3 className="text-xl font-bold text-blue-300 text-center mb-4">
              Alternative Payment Methods (PayPal)
            </h3>
            <div className="space-y-3 text-gray-200">
              <p className="border-b border-gray-600 pb-3">
                <strong className="text-white">PayPal Payment:</strong> Please send the corresponding US$ amount to our designated PayPal address: <strong className="text-blue-400">davidgomadza@hotmail.com</strong>
              </p>
              <p className="border-b border-gray-600 pb-3">
                <strong className="text-white">Cryptocurrency Deposit:</strong> Deposit the cryptocurrency worth the selected US$ amount to the following wallet address:
              </p>
              <div className="bg-black/30 rounded p-3 font-mono text-sm text-yellow-300 break-all">
                0xe9EC891eAD0E2a4bd3B14f86B9B4aB8eFD1d5180
              </div>
              <p className="text-red-300 font-bold pt-2">
                NOTE: After payment, please email your transaction proof and desired package to the contact email.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-3xl mx-auto mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 text-center" data-testid="contact-info">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
          <div className="space-y-2 text-gray-200">
            <p><strong className="text-blue-300">Email:</strong> btcyt@bitcoinayt.world</p>
            <p><strong className="text-blue-300">Email:</strong> davidgomadza@hotmail.com</p>
            <p><strong className="text-blue-300">Phone:</strong> 00447719210295</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm" data-testid="token-sale-footer">
          <p>
            &copy; 2025 Tomorrow's World Order Digital Asset Sales Platform | All prices are fixed promotional prices for hypothetical tokens and are not reflective of the market price of actual Bitcoin AGT(BTCAGT) and BITCOINAYT (BTCYT).
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TokenSalePage;
