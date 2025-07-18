import React from 'react';
import { Search, Users, Shield, Star, TrendingUp, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Search,
      title: 'Find Perfect Matches',
      description: 'Advanced search and filtering to find exactly what you need'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with escrow protection'
    },
    {
      icon: Users,
      title: 'Vetted Professionals',
      description: 'Work with top-rated freelancers and trusted clients'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Rating system ensures high-quality work and service'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Freelancers' },
    { value: '10,000+', label: 'Jobs Completed' },
    { value: '4.8/5', label: 'Average Rating' },
    { value: '$2M+', label: 'Total Earned' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Top <span className="text-blue-600">Freelancers</span>
            <br />
            For Your Next Project
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SkillLink connects businesses with skilled freelancers worldwide. 
            Post your project, receive bids, and hire the perfect talent for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={onGetStarted}
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16">
          <img
            src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
            alt="Freelance collaboration"
            className="rounded-2xl shadow-2xl mx-auto"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SkillLink?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed in the freelance economy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of freelancers and clients already using SkillLink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Sign Up as Freelancer
            </button>
            <button
              onClick={onGetStarted}
              className="border border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;