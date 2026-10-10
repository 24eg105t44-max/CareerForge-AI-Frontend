import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Briefcase, FileText, MessageSquareCode, Target, 
  ArrowRight, CheckCircle2, ShieldCheck, ChevronDown, Zap, 
  Star, Award, Users, Search, TrendingUp, Cpu
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: FileText,
      title: 'ATS Resume Optimizer',
      description: 'Instant rule-based and AI scanning that extracts keywords, checks formatting, and gives actionable recommendations to bypass ATS filters.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Target,
      title: 'Role-Based Skill Roadmaps',
      description: 'Step-by-step career path guides for Java Full Stack, React, Cloud DevOps, and AI engineering with interactive task progress tracking.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: MessageSquareCode,
      title: 'Interactive Mock Interviews',
      description: 'Practice technical, HR, and behavioral interview questions with real-time automated answer evaluation and score feedback.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Briefcase,
      title: 'Smart Job Matching Engine',
      description: 'Discover relevant job openings tailored to your tech stack with one-click application submission and status tracking.',
      color: 'from-rose-500 to-orange-600',
    },
  ];

  const steps = [
    { number: '01', title: 'Create Profile & Resume', desc: 'Build or import your professional profile with education, experience, and technical projects.' },
    { number: '02', title: 'Scan ATS & Skill Gaps', desc: 'Get your resume scored against industry standards and view targeted skill improvement roadmaps.' },
    { number: '03', title: 'Practice Interviews', desc: 'Sharpen your answers for technical coding rounds and behavioral interviews with instant feedback.' },
    { number: '04', title: 'Apply & Get Hired', desc: 'Apply directly to verified tech roles and track your application status from Under Review to Selected.' },
  ];

  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Junior Java Developer',
      company: 'TechCorp Software',
      text: 'CareerForge AI helped me optimize my resume for Java Spring Boot roles. My ATS score went from 52% to 88% and I landed 3 interview calls in two weeks!',
      avatar: 'R',
    },
    {
      name: 'Ananya Patel',
      role: 'Frontend Engineer',
      company: 'CloudScale Inc',
      text: 'The interactive React & JavaScript skill roadmap gave me a crystal clear learning plan. The mock interview evaluator was remarkably accurate!',
      avatar: 'A',
    },
    {
      name: 'Vikramaditya Roy',
      role: 'Full Stack Trainee',
      company: 'Nexus Labs',
      text: 'Having job tracking, resume builder, and AI interview prep in one platform made my CSE final year placement preparation stress-free.',
      avatar: 'V',
    },
  ];

  const faqs = [
    { q: 'Is CareerForge AI suitable for B.Tech CSE project demonstrations?', a: 'Yes! CareerForge AI is fully engineered using Java 21, Spring Boot 3 REST APIs, Spring Security with JWT, MySQL persistence, and React with Vite.' },
    { q: 'How does the ATS Resume Analyzer score my resume?', a: 'The resume module evaluates keyword presence, structural sections (Summary, Skills, Experience, Projects), length, and action verbs to generate a 0-100 ATS match score.' },
    { q: 'Can recruiters create and manage job postings?', a: 'Yes! Users with Administrator access can post new jobs, edit existing postings, review applicant cover letters, and advance application status through APPLIED, SHORTLISTED, INTERVIEW, and SELECTED.' },
    { q: 'Does the application work locally without paid AI API keys?', a: 'Yes. CareerForge AI includes an intelligent rule-based engine for ATS scanning, interview feedback, and career roadmaps, while allowing an optional OpenAI API key configuration.' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-8 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Career Intelligence for Developers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.15] mb-6">
            Build Your Future. <br />
            <span className="gradient-text">Forge Your Career.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            The all-in-one career acceleration platform for software engineers. Optimize your ATS resume score, master role-based skill roadmaps, practice AI mock interviews, and land tech jobs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/jobs"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Explore Tech Jobs</span>
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-4 text-slate-400 hover:text-white font-medium text-base transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Interactive SaaS Mockup Preview */}
          <div className="relative max-w-5xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 p-3 shadow-2xl shadow-purple-950/40">
            <div className="flex items-center gap-2 mb-3 px-3 pt-1">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs text-slate-500 font-mono ml-2">careerforge.ai/dashboard</span>
            </div>

            <div className="rounded-xl bg-[#0F172A] p-6 border border-slate-800 text-left grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">ATS Resume Score</div>
                <div className="text-3xl font-extrabold text-cyan-400">88 / 100</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-[88%]"></div>
                </div>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Match for Java Developer
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Skill Roadmap Progress</div>
                <div className="text-3xl font-extrabold text-purple-400">75% Completed</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-purple-500 h-full w-[75%]"></div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">Java 21, Spring Boot, React 18</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Applications Tracked</div>
                <div className="text-3xl font-extrabold text-white">12 Applied</div>
                <div className="flex gap-2 mt-3 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">2 Shortlisted</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">1 Interview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#070A11] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to <span className="gradient-text">Forge Your Tech Career</span>
            </h2>
            <p className="text-slate-400 text-base">
              Engineered with full-stack Spring Boot REST APIs and React for real-time performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">Streamlined Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4">How CareerForge AI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                <span className="text-4xl font-extrabold text-purple-500/40 mb-3 block">{step.number}</span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#070A11] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">Sample Candidate Feedback</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role} • {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about setting up and running CareerForge AI.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-purple-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-400 border-t border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
