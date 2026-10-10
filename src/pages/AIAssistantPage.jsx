import React, { useState } from 'react';
import api from '../services/api';
import { Sparkles, Send, Bot, User, CornerDownRight, ExternalLink } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your CareerForge AI Coach. Ask me anything about Java Spring Boot, React, ATS resume optimization, interview questions, or learning roadmaps.",
      suggestedFollowups: [
        'How do I transition to Java Full Stack Engineer?',
        'Give me top Spring Boot interview questions',
        'What keywords boost my ATS resume score?',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', {
        message: textToSend,
        contextRole: 'Java Full Stack Developer',
      });

      const aiMsg = {
        sender: 'ai',
        text: res.data.reply,
        suggestedFollowups: res.data.suggestedFollowups,
        recommendedResources: res.data.recommendedResources,
        engineType: res.data.engineType,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I encountered an issue processing your query. Please try again or check your backend connection.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" /> AI Career Assistant
            </h1>
            <p className="text-sm text-slate-400 mt-1">Get real-time career guidance, interview prep tips, and tech roadmaps</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
            Rule-Based & AI Ready
          </span>
        </div>

        {/* Chat History Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 min-h-[450px] max-h-[600px] flex flex-col justify-between shadow-2xl">
          <div className="space-y-6 overflow-y-auto pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-2xl space-y-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-[#0F172A] border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggested Followups Chips */}
                  {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.suggestedFollowups.map((f, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(f)}
                          className="px-3 py-1 rounded-full bg-slate-800 hover:bg-purple-600/30 text-purple-300 text-xs font-medium border border-purple-500/20 transition-all flex items-center gap-1.5"
                        >
                          <CornerDownRight className="w-3 h-3 text-cyan-400" /> {f}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Recommended Resources */}
                  {msg.recommendedResources && msg.recommendedResources.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                      <span className="font-semibold text-cyan-400">Recommended Resources:</span>
                      {msg.recommendedResources.map((res, i) => (
                        <div key={i} className="text-slate-300 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3 text-purple-400" /> {res}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 border border-slate-700">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-400">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <span>CareerForge AI is formulating response...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="pt-4 border-t border-slate-800/80 flex gap-3 mt-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask career questions, interview concepts, or roadmap tips..."
              className="flex-1 p-3.5 rounded-xl bg-[#0F172A] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
