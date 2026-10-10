import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070A11] border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="font-bold text-lg text-white">CareerForge AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering engineers and tech candidates with AI-driven resume scoring, role-based roadmaps, interactive interview prep, and live job matching.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="#" className="hover:text-purple-400 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="hover:text-purple-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-purple-400 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-purple-400 transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/jobs" className="hover:text-purple-400 transition-colors">Smart Job Portal</Link></li>
              <li><Link to="/resume" className="hover:text-purple-400 transition-colors">ATS Resume Builder</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-purple-400 transition-colors">AI Career Coach</Link></li>
              <li><Link to="/interview" className="hover:text-purple-400 transition-colors">Mock Interview Prep</Link></li>
              <li><Link to="/roadmap" className="hover:text-purple-400 transition-colors">Skill Gap Analyzer</Link></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-3">Architecture Stack</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300">Backend:</span> Java 21 & Spring Boot 3</li>
              <li><span className="text-slate-300">Security:</span> Spring Security & JWT</li>
              <li><span className="text-slate-300">Database:</span> MySQL / H2 JPA Engine</li>
              <li><span className="text-slate-300">Frontend:</span> React 18 & Vite</li>
              <li><span className="text-slate-300">Styling:</span> Tailwind CSS & Lucide Icons</li>
            </ul>
          </div>

          {/* Contact / Project Note */}
          <div>
            <h4 className="text-white font-semibold mb-3">B.Tech CSE Project</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built as a comprehensive Capstone Project demonstrating full-stack enterprise architecture and AI career development.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="text-cyan-400 font-semibold block mb-0.5">Local Server Status</span>
              Backend: localhost:8080<br/>
              Frontend: localhost:5173
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CareerForge AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Designed for high performance software engineers
          </div>
        </div>
      </div>
    </footer>
  );
}
