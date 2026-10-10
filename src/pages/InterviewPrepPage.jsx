import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  MessageSquareCode, CheckCircle2, AlertCircle, Award, 
  HelpCircle, Send, RefreshCw, Star, Clock 
} from 'lucide-react';

export default function InterviewPrepPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchHistory();
  }, [selectedCategory, selectedDifficulty]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/interviews/questions', {
        params: { category: selectedCategory, difficulty: selectedDifficulty },
      });
      setQuestions(res.data);
      setCurrentQuestionIdx(0);
      setFeedback(null);
      setUserAnswer('');
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get('/interviews/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch interview history:', err);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim() || !currentQuestion) return;

    setEvaluating(true);
    try {
      const res = await api.post('/interviews/submit', {
        targetRole: 'Java Full Stack Developer',
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
        questionId: currentQuestion.id,
        userQuestion: currentQuestion.questionText,
        userAnswer,
      });

      setFeedback(res.data);
      fetchHistory();
    } catch (err) {
      alert('Failed to evaluate answer.');
    } finally {
      setEvaluating(false);
    }
  };

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Interactive Mock Interview Prep</h1>
            <p className="text-sm text-slate-400 mt-1">Practice real Java, React, System Design, and Behavioral interview questions</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider self-center mr-2">Category:</span>
            {['All', 'Technical', 'Behavioral', 'HR'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-[#0F172A] text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider self-center mr-2">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDifficulty === diff ? 'bg-cyan-600 text-white' : 'bg-[#0F172A] text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Question & Practice Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Question & Answer Panel */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="py-20 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : questions.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
                No questions found for selected category/difficulty.
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
                {/* Question Info Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-bold uppercase">
                      {currentQuestion.category}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase">
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                </div>

                {/* Question Text */}
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug mb-3">
                    {currentQuestion.questionText}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-slate-500 font-semibold mr-1">Target Keywords:</span>
                    {currentQuestion.keyKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Answer Form */}
                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Technical Answer Response
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your structured explanation here (explain concepts, mechanisms, and real-world implementation)..."
                      className="w-full p-4 rounded-xl bg-[#0F172A] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={currentQuestionIdx === 0}
                        onClick={() => {
                          setCurrentQuestionIdx(currentQuestionIdx - 1);
                          setFeedback(null);
                          setUserAnswer('');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        disabled={currentQuestionIdx === questions.length - 1}
                        onClick={() => {
                          setCurrentQuestionIdx(currentQuestionIdx + 1);
                          setFeedback(null);
                          setUserAnswer('');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
                      >
                        Next Question
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={evaluating || !userAnswer.trim()}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 disabled:opacity-50"
                    >
                      {evaluating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Evaluate Answer</span>
                    </button>
                  </div>
                </form>

                {/* Feedback Report Banner */}
                {feedback && (
                  <div className="p-6 rounded-xl bg-[#0F172A] border border-purple-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-cyan-400" /> Evaluation Result Score
                      </div>
                      <div className="text-2xl font-extrabold text-cyan-400">{feedback.score} / 100</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{feedback.feedback}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                        <span className="font-bold text-emerald-400 block mb-1">Key Strengths</span>
                        <ul className="space-y-1 text-slate-300">
                          {feedback.strengths.map((s, i) => (
                            <li key={i}>✓ {s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs">
                        <span className="font-bold text-purple-400 block mb-1">Areas to Improve</span>
                        <ul className="space-y-1 text-slate-300">
                          {feedback.areasToImprove.map((a, i) => (
                            <li key={i}>• {a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Sample Model Answer</span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                        {feedback.suggestedAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar: Practice History */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" /> Recent Practice Sessions
              </h3>

              <div className="space-y-3">
                {history.length > 0 ? (
                  history.map((sess) => (
                    <div key={sess.id} className="p-3.5 rounded-xl bg-[#0F172A] border border-slate-800 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">{sess.targetRole}</span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">{sess.overallScore}%</span>
                      </div>
                      <div className="text-slate-400">{sess.category} • {sess.difficulty}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-xs text-slate-500 py-8">No completed interview sessions yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
