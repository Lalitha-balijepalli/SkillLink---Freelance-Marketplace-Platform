import React from 'react';
import { Clock, MapPin, Star, Users, DollarSign, Calendar } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onBid?: (job: Job) => void;
  showBidButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onBid, showBidButton = true }) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer" 
                onClick={() => onViewDetails(job)}>
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {job.description}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{timeAgo(job.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-gray-900">
                ${job.budget.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">
                {job.budgetType === 'fixed' ? 'Fixed' : '/hr'}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Due {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{job.bidCount || 0} bids</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {job.clientName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">{job.clientName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewDetails(job)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Details
            </button>
            {showBidButton && onBid && (
              <button
                onClick={() => onBid(job)}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Submit Bid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;