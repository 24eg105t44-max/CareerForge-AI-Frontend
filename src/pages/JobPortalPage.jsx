import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, Search, MapPin, DollarSign, Filter, 
  Bookmark, CheckCircle2, Clock, ArrowUpRight, X, Send, AlertCircle 
} from 'lucide-react';

export default function JobPortalPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [search, locationFilter, typeFilter]);

  const fetchJobs = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (locationFilter) params.location = locationFilter;
      if (typeFilter) params.type = typeFilter;

      const res = await api.get('/jobs', { params });
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToggle = async (e, jobId) => {
    e.stopPropagation();
    if (!user) {
      alert('Please log in to save jobs.');
      return;
    }

    try {
      const res = await api.post(`/jobs/${jobId}/save`);
      setJobs(jobs.map(j => j.id === jobId ? { ...j, isSaved: res.data.saved } : j));
    } catch (err) {
      console.error('Failed to save job:', err);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applyModalJob) return;

    try {
      await api.post(`/applications/apply/${applyModalJob.id}`, { coverLetter });
      setActionMessage(`Application submitted successfully for ${applyModalJob.title}!`);
      setJobs(jobs.map(j => j.id === applyModalJob.id ? { ...j, isApplied: true } : j));
      setApplyModalJob(null);
      setCoverLetter('');
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit application.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Tech Job Portal</h1>
            <p className="text-sm text-slate-400 mt-1">Discover verified engineering opportunities and apply directly</p>
          </div>
          {actionMessage && (
            <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {actionMessage}
            </div>
          )}
        </div>

        {/* Search and Filters Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, company, or skills (e.g. Java, React)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-500 appearance-none"
            >
              <option value="">All Locations</option>
              <option value="Bangalore / Remote">Bangalore / Remote</option>
              <option value="Hyderabad, India">Hyderabad</option>
              <option value="Pune / Hybrid">Pune</option>
              <option value="Chennai, India">Chennai</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-500 appearance-none"
            >
              <option value="">All Employment Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="REMOTE">Remote</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
        </div>

        {/* Job Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <div className="text-slate-300 font-semibold text-base">No matching jobs found</div>
            <div className="text-slate-500 text-xs mt-1">Try adjusting your keyword search or location filters</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                      {job.type}
                    </span>
                    <button
                      onClick={(e) => handleSaveToggle(e, job.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        job.isSaved ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                    {job.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mb-3">
                    {job.company} • <span className="text-slate-300">{job.location}</span>
                  </div>

                  <div className="text-xs text-emerald-400 font-semibold mb-4">
                    {job.salaryRange || 'Competitive Salary'}
                  </div>

                  {job.requiredSkills && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.requiredSkills.split(',').slice(0, 4).map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                          {sk.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  {job.isApplied ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setApplyModalJob(job);
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="text-[11px] text-slate-500">Details &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                {selectedJob.type}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2 mb-1">{selectedJob.title}</h2>
              <p className="text-sm text-slate-400">{selectedJob.company} • {selectedJob.location}</p>
              <p className="text-sm text-emerald-400 font-semibold mt-2">{selectedJob.salaryRange}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Job Description</h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
            </div>

            {selectedJob.requirements && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Requirements</h4>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{selectedJob.requirements}</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700"
              >
                Close
              </button>
              {!selectedJob.isApplied && (
                <button
                  onClick={() => {
                    setApplyModalJob(selectedJob);
                    setSelectedJob(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500"
                >
                  Apply for Position
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-2xl p-6 space-y-5 relative">
            <button
              onClick={() => setApplyModalJob(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white">Apply to {applyModalJob.company}</h3>
              <p className="text-xs text-purple-400 font-semibold mt-0.5">{applyModalJob.title}</p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Cover Letter / Note (Optional)
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why your experience with Java, Spring Boot, or React makes you a great fit..."
                  className="w-full p-3 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 text-xs text-slate-400">
                ⚡ Application will be saved to MySQL database and routed to Recruiter Admin dashboard.
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalJob(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
