import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';

const LandingPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20" data-testid="hero-section">
        <div className="text-center">
          <Logo size="xl" />
          <h1 className="mt-8 text-5xl md:text-7xl font-bold text-white mb-6" data-testid="hero-title">
            Advanced GeneticSynthesis <br />
            <span className="gradient-text">Technology</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
            Unlock the power to extend your life from 1 year to 8000+ years. 
            AGT removes death forever through revolutionary genetic synthesis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link
                to="/wallet"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                data-testid="access-wallet-button"
              >
                Access Your Wallet
              </Link>
            ) : (
              <Link
                to="/auth"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                data-testid="get-started-button"
              >
                Get Started
              </Link>
            )}
            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg text-lg font-semibold transition-all backdrop-blur-sm"
              data-testid="learn-more-button"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="container mx-auto px-4 py-16" data-testid="key-metrics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center card-hover" data-testid="metric-years">
            <div className="text-5xl font-bold text-blue-400 mb-2">8000+</div>
            <div className="text-xl text-white">Maximum Years Extension</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center card-hover" data-testid="metric-coins">
            <div className="text-5xl font-bold text-purple-400 mb-2">2</div>
            <div className="text-xl text-white">Types AGT Coins Available</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center card-hover" data-testid="metric-prevention">
            <div className="text-5xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-xl text-white">Death Prevention Rate</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16" data-testid="features-section">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose AGT?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Revolutionary Technology',
              description: 'Breakthrough genetic synthesis at cellular level',
              icon: '🧬',
              testId: 'feature-technology'
            },
            {
              title: 'Blockchain Security',
              description: 'Military-grade encryption protects your AGT tokens',
              icon: '🔐',
              testId: 'feature-security'
            },
            {
              title: 'Instant Activation',
              description: 'Quick verification and immediate life extension',
              icon: '⚡',
              testId: 'feature-activation'
            },
            {
              title: 'Unlimited Lifespan',
              description: 'Live on Earth forever with 8000+ years extension',
              icon: '♾️',
              testId: 'feature-lifespan'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover"
              data-testid={feature.testId}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20" data-testid="cta-section">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-gray-100 mb-8">Join thousands who have already chosen eternal life</p>
          {user ? (
            <Link
              to="/purchase"
              className="inline-block px-10 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              data-testid="purchase-agt-button"
            >
              Purchase AGT Now
            </Link>
          ) : (
            <Link
              to="/auth"
              className="inline-block px-10 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              data-testid="cta-get-started-button"
            >
              Get Started Today
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-950 border-t border-purple-800 py-8" data-testid="footer">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">© 2025 AGT Platform - Advanced GeneticSynthesis Technology</p>
          <p className="text-sm">Optimism Contract: 0x9427A2a738AffBc5880F0646b5251069c022e525</p>
          <p className="text-sm">Payment Address: 0xe9EC891eAD0E2a4bd3B14f86B9B4aB8eFD1d5180</p>
          <div className="mt-4 space-x-4">
            <a href="https://bitcoinayt.world" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              BitcoinAYT
            </a>
            <a href="https://twofuture.world" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              TwoFuture
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;