import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { useAuthStore } from '../store/authStore';
import { Job } from '../types';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import BidModal from './BidModal';

const JobBrowser: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { getFilteredJobs, searchQuery, setSearchQuery } = useJobStore();
  const { user, isAuthenticated } = useAuthStore();

  const filteredJobs = getFilteredJobs();

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleBid = (job: Job) => {
    if (!isAuthenticated) {
      alert('Please login to submit a bid');
      return;
    }
    if (user?.role !== 'freelancer') {
      alert('Only freelancers can submit bids');
      return;
    }
    setSelectedJob(job);
    setShowBidModal(true);
  };

  const handleCloseBidModal = () => {
    setShowBidModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="text-gray-600 mt-2">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <JobFilters />
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  onBid={handleBid}
                  showBidButton={user?.role === 'freelancer'}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {selectedJob && (
        <BidModal
          job={selectedJob}
          isOpen={showBidModal}
          onClose={handleCloseBidModal}
        />
      )}
    </div>
  );
};

export default JobBrowser;