import React from 'react';
import { Plus, Users, Briefcase, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { useAuthStore } from '../../store/authStore';

interface ClientDashboardProps {
  onPostJob: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onPostJob }) => {
  const { jobs } = useJobStore();
  const { user } = useAuthStore();

  const userJobs = jobs.filter(job => job.postedBy === user?.id);
  const activeJobs = userJobs.filter(job => job.status === 'open');
  const completedJobs = userJobs.filter(job => job.status === 'completed');
  const totalSpent = userJobs.reduce((sum, job) => sum + job.budget, 0);

  const stats = [
    {
      title: 'Posted Jobs',
      value: userJobs.length.toString(),
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+3'
    },
    {
      title: 'Active Jobs',
      value: activeJobs.length.toString(),
      icon: Clock,
      color: 'bg-orange-500',
      change: '+1'
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+$2.5k'
    },
    {
      title: 'Freelancers Hired',
      value: completedJobs.length.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+2'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
        <button
          onClick={onPostJob}
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Post New Job</span>
        </button>
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

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
          <button
            onClick={onPostJob}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {userJobs.length > 0 ? (
            userJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-500">{job.bidCount || 0} bids received</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${job.budget.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{job.budgetType}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' :
                    job.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No jobs posted yet</p>
              <button
                onClick={onPostJob}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
              >
                Post Your First Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;