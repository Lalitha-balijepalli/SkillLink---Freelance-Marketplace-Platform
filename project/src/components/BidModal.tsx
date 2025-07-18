import React, { useState } from 'react';
import { X, DollarSign, Clock, FileText } from 'lucide-react';
import { Job } from '../types';
import { useJobStore } from '../store/jobStore';
import { useAuthStore } from '../store/authStore';

interface BidModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const BidModal: React.FC<BidModalProps> = ({ job, isOpen, onClose }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { submitBid } = useJobStore();
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      await submitBid({
        jobId: job.id,
        freelancerId: user.id,
        freelancerName: user.name,
        freelancerAvatar: user.avatar,
        bidAmount: parseFloat(bidAmount),
        proposalText: proposal,
        deliveryTime: parseInt(deliveryTime)
      });
      
      onClose();
      setBidAmount('');
      setDeliveryTime('');
      setProposal('');
    } catch (error) {
      console.error('Error submitting bid:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Submit a Bid</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Budget: ${job.budget.toLocaleString()} {job.budgetType === 'fixed' ? 'Fixed' : '/hr'}</span>
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Your Bid Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                  className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your bid amount"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                You'll receive ${bidAmount ? (parseFloat(bidAmount) * 0.9).toFixed(2) : '0.00'} after SkillLink's 10% service fee
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Delivery Time (days)
              </label>
              <input
                type="number"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                required
                min="1"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How many days do you need?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 inline mr-1" />
                Proposal
              </label>
              <textarea
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                required
                rows={6}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Bid'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BidModal;