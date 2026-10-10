import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Sparkles, Briefcase, FileText, Target, MessageSquareCode, 
  Bell, CheckCircle, Clock, ArrowRight, Award, TrendingUp, Bookmark
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [profileRes, resumeRes, appsRes, jobsRes, notifRes] = await Promise.all([
        api.get('/profile').catch(() => ({ data: null })),
        api.get('/resumes').catch(() => ({ data: null })),
        api.get('/applications/my-applications').catch(() => ({ data: [] })),
        api.get('/jobs').catch(() => ({ data: [] })),
        api.get('/notifications').catch(() => ({ data: [] })),
      ]);

      setProfile(profileRes.data);
      setResume(resumeRes.data);
      setApplications(appsRes.data);
      setJobs(jobsRes.data.slice(0, 3));
      setNotifications(notifRes.data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'May', applications: 2 },
    { name: 'Jun', applications: 5 },
    { name: 'Jul', applications: 8 },
    { name: 'Aug', applications: 4 },
    { name: 'Sep', applications: 10 },
    { name: 'Oct', applications: applications.length || 6 },
  ];

  const skillData = [
    { name: 'Java', score: 85, color: '#8B5CF6' },
    { name: 'Spring Boot', score: 90, color: '#06B6D4' },
    { name: 'React', score: 75, color: '#3B82F6' },
    { name: 'SQL', score: 80, color: '#10B981' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="relative rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/20 p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Candidate Dashboard
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                Welcome back, <span className="gradient-text">{user?.name || 'Engineer'}</span> 👋
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                {profile?.title || 'Software Engineering Aspirant'} • {profile?.location || 'Bangalore, India'}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/resume"
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" /> ATS Resume Scanner
              </Link>
              <Link
                to="/ai-assistant"
                className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" /> Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">Profile Completion</span>
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{profile?.profileCompletion || 85}%</div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${profile?.profileCompletion || 85}%` }}></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">ATS Resume Score</span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-cyan-400">{resume?.score || 85} / 100</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Optimal Keyword Density
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">Active Applications</span>
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{applications.length}</div>
            <div className="text-xs text-slate-400 mt-2">Tracked in database</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">Interview Readiness</span>
              <MessageSquareCode className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">High</div>
            <div className="text-xs text-slate-400 mt-2">Spring Boot & React modules</div>
          </div>
        </div>

        {/* Charts & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart 1: Application Velocity */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Application Velocity</h3>
                <p className="text-xs text-slate-400">Monthly job applications submitted</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-semibold">Live Analytics</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px' }} />
                  <Bar dataKey="applications" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#8B5CF6' : '#334155'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Notifications Drawer */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-400" /> Recent Activity
              </h3>
              <span className="text-xs text-slate-400">{notifications.length} items</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-72 pr-1">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#0F172A] border border-slate-800 text-xs">
                    <div className="font-semibold text-purple-300 mb-1">{n.title}</div>
                    <div className="text-slate-400 leading-relaxed">{n.message}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-xs text-slate-500 py-8">No unread notifications</div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Jobs Preview */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Recommended Job Openings</h3>
              <p className="text-xs text-slate-400">Curated positions matching your stack</p>
            </div>
            <Link to="/jobs" className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
              View All Jobs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div key={job.id} className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <div>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                    {job.type}
                  </span>
                  <h4 className="font-bold text-white text-base mt-2 mb-1">{job.title}</h4>
                  <p className="text-xs text-slate-400 mb-3">{job.company} • {job.location}</p>
                  <p className="text-xs text-emerald-400 font-semibold mb-4">{job.salaryRange}</p>
                </div>
                <Link
                  to="/jobs"
                  className="w-full text-center py-2 rounded-lg bg-slate-800 hover:bg-purple-600 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  Apply Position
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
