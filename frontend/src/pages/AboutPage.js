import React from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';

const AboutPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-12" data-testid="about-page">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Logo size="lg" />
            <h1 className="text-5xl font-bold text-white mt-8 mb-4" data-testid="about-title">About AGT</h1>
            <p className="text-xl text-gray-300">Advanced GeneticSynthesis Technology</p>
          </div>

          {/* What is AGT */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-6" data-testid="what-is-agt">
            <h2 className="text-3xl font-bold text-white mb-4">What is AGT?</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                AGT (Advanced GeneticSynthesis Technology) is a revolutionary breakthrough that extends human life from 1 year up to 8000+ years without dying. This groundbreaking technology removes the deathline from your body, allowing you to live on Earth forever.
              </p>
              <p>
                The AGT system consists of 28 main coins that powerlife and 84 subsets that serve as cures and solutions to all diseases and problems that cause human mortality.
              </p>
            </div>
          </div>

          {/* The Two-Coin System */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-6" data-testid="two-coin-system">
            <h2 className="text-3xl font-bold text-white mb-4">The Two-Coin System</h2>
            <div className="space-y-6">
              <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">1. AGT on World Chain</h3>
                <p className="text-gray-300">
                  A cryptocurrency token secured on the Optimism blockchain network. This serves as proof of your purchase and can be traded or transferred. Contract Address: 0x9427A2a738AffBc5880F0646b5251069c022e525
                </p>
              </div>
              <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">2. AGT for Body</h3>
                <p className="text-gray-300">
                  The actual life extension technology applied to your body. Each AGT for Body represents years added to your lifespan. Accumulate 8000 AGT for Body to achieve complete immortality and live on Earth forever.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-6" data-testid="benefits">
            <h2 className="text-3xl font-bold text-white mb-4">Benefits of AGT</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Removes Menopause:</strong> Women can look young again as they did in their teens and have children after menopause.
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Reverses Male Aging:</strong> Removes ajvo (male equivalent of menopause), reversing all effects of old age in men.
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Removes Death:</strong> The AGT removes the deathline from your body, allowing you to live forever in good health.
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Eliminates Diseases:</strong> Comprehensive cure for all diseases and health issues that cause human mortality.
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Removes Old Age:</strong> Eradicates wrinkles, grey hairs, fat accumulation, dementia, and all aging symptoms.
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Best-of-Humans Experience:</strong> Heightens health, happiness, joy, sexual experience, self-esteem, courage, and self-drive to ultimate levels.
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-white">Enhanced Understanding:</strong> Clearer comprehension of life, the universe, and your purpose, reducing stress and enabling better problem-solving.
                </div>
              </div>
            </div>
          </div>

          {/* 8000AGT Special */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-8 mb-6" data-testid="immortality-section">
            <h2 className="text-3xl font-bold text-white mb-4">8000 AGT = Complete Immortality</h2>
            <p className="text-yellow-100">
              Once you collect 8000 AGT for Body, death will be completely removed from your body forever. You will qualify for the Live-On-Earth Forever Campaign. Even if death tries to reach you, simply state that you have 8000 AGT and you choose to live on Earth forever - death will have no power over you.
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8" data-testid="pricing">
            <h2 className="text-3xl font-bold text-white mb-4">Pricing & Conditions</h2>
            <div className="space-y-4 text-gray-300">
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
                <div className="text-xl font-bold text-white mb-2">Standard Price: $100 USD per AGT</div>
                <div>500 GTPS = 8000 AGT (Complete Life Extension)</div>
                <div className="text-sm mt-2">This generous offer is to benefit early adopters with not just life but also a source of income.</div>
              </div>
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
                <div className="font-bold text-white mb-2">Participation Conditions:</div>
                <ul className="space-y-1 text-sm">
                  <li>• No millionaires or billionaires allowed at standard price</li>
                  <li>• Millionaires: $100,000 USD for AGT package</li>
                  <li>• Billionaires: $1,000,000 USD for AGT package</li>
                  <li>• Limit: 500 GTPS per person (one entry per person)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;