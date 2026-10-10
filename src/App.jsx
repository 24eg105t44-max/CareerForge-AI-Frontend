import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobPortalPage from './pages/JobPortalPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import AIAssistantPage from './pages/AIAssistantPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import SkillRoadmapPage from './pages/SkillRoadmapPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0B0F19] text-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/jobs" element={<JobPortalPage />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <ResumeBuilderPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/ai-assistant"
                element={
                  <ProtectedRoute>
                    <AIAssistantPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/interview"
                element={
                  <ProtectedRoute>
                    <InterviewPrepPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/roadmap"
                element={
                  <ProtectedRoute>
                    <SkillRoadmapPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
