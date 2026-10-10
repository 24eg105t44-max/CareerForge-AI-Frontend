import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  ShieldAlert, Users, Briefcase, FileCheck, Plus, 
  Trash2, Edit, X, CheckCircle2, User, Send 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Job form fields
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('FULL_TIME');
  const [salaryRange, setSalaryRange] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, jobsRes, appsRes, usersRes] = await Promise.all([
        api.get('/admin/stats').catch(() => ({ data: null })),
        api.get('/jobs').catch(() => ({ data: [] })),
        api.get('/admin/applications').catch(() => ({ data: [] })),
        api.get('/admin/users').catch(() => ({ data: [] })),
      ]);

      setStats(statsRes.data);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await api.put(`/admin/applications/${appId}/status`, { status: newStatus });
      setApplications(applications.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: jobTitle,
      company,
      location,
      type,
      salaryRange,
      description,
      requiredSkills,
      status: 'ACTIVE',
    };

    try {
      if (editingJob) {
        await api.put(`/admin/jobs/${editingJob.id}`, payload);
      } else {
        await api.post('/admin/jobs', payload);
      }
      setShowJobModal(false);
      resetJobForm();
      fetchAdminData();
    } catch (err) {
      alert('Failed to save job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;
    try {
      await api.delete(`/admin/jobs/${jobId}`);
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const resetJobForm = () => {
    setEditingJob(null);
    setJobTitle('');
    setCompany('');
    setLocation('');
    setType('FULL_TIME');
    setSalaryRange('');
    setDescription('');
    setRequiredSkills('');
  };

  const openEditJob = (j) => {
    setEditingJob(j);
    setJobTitle(j.title);
    setCompany(j.company);
    setLocation(j.location);
    setType(j.type);
    setSalaryRange(j.salaryRange);
    setDescription(j.description);
    setRequiredSkills(j.requiredSkills);
    setShowJobModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" /> Administrator Controls
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Platform Admin Console</h1>
          </div>

          <button
            onClick={() => {
              resetJobForm();
              setShowJobModal(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Post New Job Opening
          </button>
        </div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Total Registered Users</div>
              <div className="text-3xl font-extrabold text-white mt-2">{stats.totalUsers}</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Active Job Postings</div>
              <div className="text-3xl font-extrabold text-purple-400 mt-2">{stats.activeJobs}</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Total Applications Received</div>
              <div className="text-3xl font-extrabold text-cyan-400 mt-2">{stats.totalApplications}</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400">System Resumes Analyzed</div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">{stats.totalResumes}</div>
            </div>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex gap-2 border-b border-slate-800 pb-4">
          {[
            { id: 'applications', label: `Job Applications (${applications.length})` },
            { id: 'jobs', label: `Manage Job Listings (${jobs.length})` },
            { id: 'users', label: `Registered Users (${users.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#0F172A] text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Applications Table */}
        {activeTab === 'applications' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F172A] border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Applied Job</th>
                    <th className="p-4">Cover Letter</th>
                    <th className="p-4">Applied Date</th>
                    <th className="p-4">Status Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-semibold text-white">
                          {app.userName}
                          <div className="text-[11px] text-slate-500 font-normal">{app.userEmail}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-purple-300">{app.jobTitle}</div>
                          <div className="text-[11px] text-slate-500">{app.company}</div>
                        </td>
                        <td className="p-4 max-w-xs truncate text-slate-400">{app.coverLetter || 'No cover letter attached.'}</td>
                        <td className="p-4 text-slate-400">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg bg-[#0F172A] border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
                          >
                            <option value="APPLIED">APPLIED</option>
                            <option value="UNDER_REVIEW">UNDER REVIEW</option>
                            <option value="SHORTLISTED">SHORTLISTED</option>
                            <option value="INTERVIEW">INTERVIEW</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="SELECTED">SELECTED 🎉</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No applications received yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Jobs */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((j) => (
              <div key={j.id} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase">{j.type}</span>
                  <h4 className="font-bold text-white text-base mt-1">{j.title}</h4>
                  <p className="text-xs text-slate-400">{j.company} • {j.location}</p>
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">{j.salaryRange}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditJob(j)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteJob(j.id)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Registered Users */}
        {activeTab === 'users' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F172A] border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Registered Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-white">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'ROLE_ADMIN' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal: Job Create / Edit */}
        {showJobModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-2xl p-6 space-y-4 relative">
              <button onClick={() => setShowJobModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-white">{editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}</h3>

              <form onSubmit={handleJobSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Java Developer"
                      className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. CloudScale Labs"
                      className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Bangalore / Remote"
                      className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                    >
                      <option value="FULL_TIME">FULL_TIME</option>
                      <option value="PART_TIME">PART_TIME</option>
                      <option value="REMOTE">REMOTE</option>
                      <option value="INTERNSHIP">INTERNSHIP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Salary Range</label>
                    <input
                      type="text"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      placeholder="₹10,00,000 PA"
                      className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Required Skills</label>
                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    placeholder="Java, Spring Boot, React, MySQL"
                    className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-xs"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowJobModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-lg shadow-purple-600/30">
                    {editingJob ? 'Update Job' : 'Publish Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
