import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  FileText, Sparkles, Save, CheckCircle2, AlertTriangle, 
  Plus, Trash2, Award, BookOpen, Briefcase, Code, Download 
} from 'lucide-react';

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [title, setTitle] = useState('My Full Stack Resume');
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await api.get('/resumes');
      const data = res.data;
      if (data) {
        setTitle(data.title || 'Full Stack Software Engineer');
        setSummary(data.summary || '');
        setEducation(data.educationJson ? JSON.parse(data.educationJson) : []);
        setExperience(data.experienceJson ? JSON.parse(data.experienceJson) : []);
        setSkills(data.skillsJson ? JSON.parse(data.skillsJson) : ['Java', 'Spring Boot', 'React', 'MySQL']);
        setProjects(data.projectsJson ? JSON.parse(data.projectsJson) : []);
        setCertifications(data.certificationsJson ? JSON.parse(data.certificationsJson) : []);
      }
    } catch (err) {
      console.error('Failed to load resume:', err);
    }
  };

  const handleSaveAndAnalyze = async () => {
    setSaving(true);
    setSaveSuccess(false);

    const payload = {
      title,
      summary,
      educationJson: JSON.stringify(education),
      experienceJson: JSON.stringify(experience),
      skillsJson: JSON.stringify(skills),
      projectsJson: JSON.stringify(projects),
      certificationsJson: JSON.stringify(certifications),
    };

    try {
      await api.post('/resumes', payload);
      const analysisRes = await api.get('/resumes/analyze');
      setAnalysis(analysisRes.data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (newSkill) => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">ATS Resume Builder & Analyzer</h1>
            <p className="text-sm text-slate-400 mt-1">Craft ATS-optimized resumes and score your keywords against industry standards</p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Saved & Scored!
              </span>
            )}
            <button
              onClick={handleSaveAndAnalyze}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Sparkles className="w-4 h-4" />}
              <span>Save & Run ATS Scan</span>
            </button>
          </div>
        </div>

        {/* ATS Score Banner (If analyzed) */}
        {analysis && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 pr-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall ATS Score</span>
              <div className="text-4xl font-extrabold text-cyan-400 mt-1">{analysis.atsScore} / 100</div>
              <div className="text-xs text-slate-400 mt-1">Formatting: {analysis.formattingScore}%</div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Matched Keywords ({analysis.keywordMatches.length})</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {analysis.keywordMatches.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              {analysis.recommendations && (
                <div>
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">ATS Improvement Tips</span>
                  <ul className="mt-1 space-y-1 text-xs text-slate-300">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Builder & Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form Editor */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
              {['summary', 'skills', 'experience', 'education', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Resume Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Professional Summary</label>
                  <textarea
                    rows={5}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Highlight your key software development skills, Java/Spring Boot experience, and quantifiable metrics..."
                    className="w-full p-3 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Tab 2: Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Technical Skills & Technologies</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    placeholder="e.g., Spring Boot, Microservices, Docker..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="flex-1 p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('skillInput');
                      if (input.value) {
                        addSkill(input.value);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Add Skill
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs flex items-center gap-2 border border-slate-700">
                      {sk}
                      <button onClick={() => removeSkill(idx)} className="text-slate-400 hover:text-rose-400">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Work / Internship Experience</label>
                  <button
                    onClick={() => setExperience([...experience, { company: '', role: '', duration: '', details: '' }])}
                    className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 text-xs font-semibold border border-purple-500/30 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Experience
                  </button>
                </div>

                {experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3 relative">
                    <button
                      onClick={() => setExperience(experience.filter((_, i) => i !== idx))}
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].company = e.target.value;
                          setExperience(copy);
                        }}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Job Title / Role"
                        value={exp.role}
                        onChange={(e) => {
                          const copy = [...experience];
                          copy[idx].role = e.target.value;
                          setExperience(copy);
                        }}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                      />
                    </div>
                    <textarea
                      placeholder="Bullet points and achievements..."
                      rows={2}
                      value={exp.details}
                      onChange={(e) => {
                        const copy = [...experience];
                        copy[idx].details = e.target.value;
                        setExperience(copy);
                      }}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    ></textarea>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Education & Projects */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Education Credentials</label>
                <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
                  <input
                    type="text"
                    placeholder="Degree (e.g. B.Tech Computer Science)"
                    value={education[0]?.degree || ''}
                    onChange={(e) => setEducation([{ ...education[0], degree: e.target.value }])}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="University / College Name"
                    value={education[0]?.institution || ''}
                    onChange={(e) => setEducation([{ ...education[0], institution: e.target.value }])}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Featured Technical Projects</label>
                <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
                  <input
                    type="text"
                    placeholder="Project Name (e.g., CareerForge AI)"
                    value={projects[0]?.name || ''}
                    onChange={(e) => setProjects([{ ...projects[0], name: e.target.value }])}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                  <textarea
                    placeholder="Project description and technology stack used..."
                    rows={3}
                    value={projects[0]?.description || ''}
                    onChange={(e) => setProjects([{ ...projects[0], description: e.target.value }])}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Document Preview */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-slate-200 font-sans shadow-2xl relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Live Document Preview</span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> PDF Print
              </button>
            </div>

            {/* Simulated Printed Resume Document */}
            <div className="bg-[#0F172A] p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="border-b border-slate-800 pb-3 text-center">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{title}</h2>
                <p className="text-slate-400 mt-1">Java Full Stack • Spring Boot 3 • React 18</p>
              </div>

              {summary && (
                <div>
                  <h4 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-1">Professional Summary</h4>
                  <p className="text-slate-300 leading-relaxed">{summary}</p>
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Technical Skills</h4>
                  <p className="text-slate-300">{skills.join(' • ')}</p>
                </div>
              )}

              {experience.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Work Experience</h4>
                  {experience.map((exp, i) => (
                    <div key={i} className="mb-2">
                      <div className="font-bold text-white flex justify-between">
                        <span>{exp.role || 'Software Developer'}</span>
                        <span className="text-slate-400 font-normal">{exp.company}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">{exp.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Projects</h4>
                  {projects.map((proj, i) => (
                    <div key={i}>
                      <div className="font-bold text-white">{proj.name || 'CareerForge AI Project'}</div>
                      <p className="text-slate-300 text-[11px]">{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
