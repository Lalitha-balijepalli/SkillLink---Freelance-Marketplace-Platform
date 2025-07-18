import React from 'react';
import { DollarSign, Briefcase, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useAuthStore } from '../../store/authStore';

const FreelancerDashboard: React.FC = () => {
  const { userBids } = useJobStore();
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Total Earnings',
      value: '$12,450',
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12%'
    },
    {
      title: 'Active Projects',
      value: '3',
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+2'
    },
    {
      title: 'Completed Jobs',
      value: user?.completedJobs || '0',
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: '+5'
    },
    {
      title: 'Average Rating',
      value: user?.rating || '0.0',
      icon: Star,
      color: 'bg-yellow-500',
      change: '+0.1'
    }
  ];

  const recentBids = userBids.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Freelancer Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, {user?.name}!
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bids */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bids</h3>
          <div className="space-y-4">
            {recentBids.length > 0 ? (
              recentBids.map((bid) => (
                <div key={bid.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">${bid.bidAmount}</p>
                    <p className="text-sm text-gray-500">{bid.deliveryTime} days delivery</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No bids submitted yet</p>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Profile Photo</span>
              <span className="text-sm font-medium text-green-600">✓ Complete</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Skills</span>
              <span className="text-sm font-medium text-green-600">✓ Complete</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Portfolio</span>
              <span className="text-sm font-medium text-green-600">✓ Complete</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hourly Rate</span>
              <span className="text-sm font-medium text-green-600">✓ Complete</span>
            </div>
            <div className="mt-4 bg-green-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-sm text-gray-600 text-center">Profile 100% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;