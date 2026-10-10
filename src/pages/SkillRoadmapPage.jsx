import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Target, CheckCircle2, Circle, ExternalLink, Save, Award, Sparkles } from 'lucide-react';

export default function SkillRoadmapPage() {
  const [targetRole, setTargetRole] = useState('Java Full Stack Engineer');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchRoadmap(targetRole);
  }, [targetRole]);

  const fetchRoadmap = async (role) => {
    setLoading(true);
    try {
      const res = await api.get('/skills/roadmap', { params: { role } });
      setRoadmap(res.data);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skillId) => {
    if (!roadmap) return;
    const updatedSkills = roadmap.skills.map((s) => (s.id === skillId ? { ...s, isCompleted: !s.isCompleted } : s));
    const completedCount = updatedSkills.filter((s) => s.isCompleted).length;
    const progressPercentage = Math.round((completedCount / updatedSkills.length) * 100);

    setRoadmap({ ...roadmap, skills: updatedSkills, progressPercentage });
  };

  const saveRoadmapState = async () => {
    if (!roadmap) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await api.post('/skills/roadmap', roadmap);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save skill progress.');
    } finally {
      setSaving(false);
    }
  };

  const rolesList = [
    'Java Full Stack Engineer',
    'React & Frontend Specialist',
    'AI / ML Engineer',
    'DevOps Cloud Engineer',
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Target className="w-7 h-7 text-purple-400" /> Career Skill Roadmaps
            </h1>
            <p className="text-sm text-slate-400 mt-1">Role-based learning modules with interactive progress tracking</p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Progress Saved to DB!
              </span>
            )}
            <button
              onClick={saveRoadmapState}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
              <span>Save Progress</span>
            </button>
          </div>
        </div>

        {/* Role Select Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-3">
          {rolesList.map((r) => (
            <button
              key={r}
              onClick={() => setTargetRole(r)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                targetRole === r
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#0F172A] text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Roadmap Display */}
        {loading ? (
          <div className="py-20 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : roadmap ? (
          <div className="space-y-8">
            {/* Progress Bar Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Active Learning Path</span>
                <h3 className="text-2xl font-bold text-white mt-1">{roadmap.targetRole}</h3>
                <p className="text-xs text-slate-400 mt-1">Level: {roadmap.currentLevel || 'Intermediate'}</p>
              </div>

              <div className="w-full md:w-80">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Completion</span>
                  <span className="text-cyan-400">{roadmap.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${roadmap.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Skills Checklist Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmap.skills.map((skill, index) => (
                <div
                  key={skill.id || index}
                  onClick={() => toggleSkill(skill.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    skill.isCompleted
                      ? 'bg-purple-950/20 border-purple-500/40 text-white'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5">
                    {skill.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-base font-bold ${skill.isCompleted ? 'text-white line-through opacity-80' : 'text-white'}`}>
                        {skill.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-semibold uppercase">
                        {skill.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">Level Requirement: {skill.level || 'Required'}</p>

                    {skill.resourceUrl && (
                      <a
                        href={skill.resourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline pt-1"
                      >
                        Official Docs <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
