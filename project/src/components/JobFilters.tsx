import React from 'react';
import { Filter, X } from 'lucide-react';
import { useJobStore } from '../store/jobStore';

const JobFilters: React.FC = () => {
  const { 
    searchQuery, 
    selectedSkills, 
    budgetRange, 
    setSearchQuery, 
    setSelectedSkills, 
    setBudgetRange 
  } = useJobStore();

  const availableSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'PostgreSQL',
    'UI/UX Design', 'Figma', 'Adobe XD', 'WordPress', 'PHP', 'SEO',
    'Mobile Development', 'iOS', 'Android', 'Flutter', 'React Native'
  ];

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        {(selectedSkills.length > 0 || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkills([]);
              setBudgetRange([0, 10000]);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Jobs
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedSkills.includes(skill)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={budgetRange[0]}
              onChange={(e) => setBudgetRange([parseInt(e.target.value), budgetRange[1]])}
              placeholder="Min"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={budgetRange[1]}
              onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
              placeholder="Max"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;