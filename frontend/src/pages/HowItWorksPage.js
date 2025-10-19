import React from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

const HowItWorksPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="how-it-works-page">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 text-center" data-testid="how-it-works-title">How It Works</h1>

          {/* Process Steps */}
          <div className="space-y-8 mb-12">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="step-1">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-6">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Purchase AGT Tokens</h3>
                  <p className="text-gray-300 mb-4">
                    Buy AGT tokens at $100 USD per AGT. You can purchase between 1 AGT (1 year extension) up to 8000 AGT (complete immortality). Payment is made via PayPal to davidgomadza@hotmail.com.
                  </p>
                  <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 text-sm text-gray-300">
                    <strong className="text-white">Payment Methods:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• PayPal: davidgomadza@hotmail.com</li>
                      <li>• Cryptocurrency: 0xe9EC891eAD0E2a4bd3B14f86B9B4aB8eFD1d5180</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="step-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-6">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Submit Proof of Purchase</h3>
                  <p className="text-gray-300 mb-4">
                    After making payment, submit your PayPal receipt or transaction confirmation. You can also provide a screenshot of the transaction for faster verification.
                  </p>
                  <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4 text-sm text-gray-300">
                    <strong className="text-white">Required Documents:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• PayPal receipt or confirmation email</li>
                      <li>• Transaction screenshot (optional but recommended)</li>
                      <li>• Purchase ID from your account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="step-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-6">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Verification (24-48 hours)</h3>
                  <p className="text-gray-300 mb-4">
                    Your proof of purchase will be reviewed and verified within 24-48 hours. Once approved, your AGT for Body will be automatically credited to your account.
                  </p>
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-sm text-gray-300">
                    <strong className="text-white">Verification Process:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Automated matching of payment details</li>
                      <li>• Confirmation of correct payment amount</li>
                      <li>• Instant credit of AGT for Body upon approval</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="step-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-6">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Activation & Life Extension</h3>
                  <p className="text-gray-300 mb-4">
                    Once verified, your AGT for Body is activated immediately. The genetic synthesis technology begins working at the cellular level to remove aging, diseases, and the deathline from your body.
                  </p>
                  <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-sm text-yellow-100">
                    <strong className="text-white">What Happens:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Cellular regeneration begins immediately</li>
                      <li>• Aging process reversal activated</li>
                      <li>• Life extension proportional to AGT amount</li>
                      <li>• With 8000 AGT: Complete immortality achieved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8" data-testid="important-notes">
            <h2 className="text-3xl font-bold text-white mb-4">Important Notes</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <span className="text-blue-400 text-xl mr-3">→</span>
                <div>All predefined life parameters expire after 120 years. The AGT extends you beyond this limit into uncharted territory.</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 text-xl mr-3">→</span>
                <div>You must make personal oaths to praise only Ya (the Creator) to maintain your extended life.</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 text-xl mr-3">→</span>
                <div>The AGT is your shield against death. With 8000 AGT, simply state your choice to live forever, and death has no power.</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-400 text-xl mr-3">→</span>
                <div>GTPS (Global Transaction Payment Solution) holders on Optimism network can claim 8000 AGT with 500 GTPS tokens.</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            {user ? (
              <Link
                to="/purchase"
                className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                data-testid="start-purchase-button"
              >
                Start Your Purchase Now
              </Link>
            ) : (
              <Link
                to="/auth"
                className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                data-testid="get-started-button"
              >
                Get Started Today
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;