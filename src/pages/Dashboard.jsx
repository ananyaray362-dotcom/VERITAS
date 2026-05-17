import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, History, ShieldCheck, AlertTriangle, Settings, LogOut, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Dashboard = ({ history, onSelect }) => {
  const stats = [
    { label: 'Total Analyzed', value: history.length, icon: History, color: 'text-primary-400' },
    { label: 'High Credibility', value: history.filter(h => h.result.trustScore >= 80).length, icon: ShieldCheck, color: 'text-accent-400' },
    { label: 'Risky Content', value: history.filter(h => h.result.trustScore < 50).length, icon: AlertTriangle, color: 'text-red-400' },
  ];

  const handleSignOut = async () => {
    localStorage.removeItem('veritas_demo_session');
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">User Dashboard</h1>
            <p className="text-gray-400">Manage your analyses and platform settings.</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-bold flex items-center space-x-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-4xl font-black text-white">{stat.value}</span>
              </div>
              <h3 className="text-gray-400 font-bold">{stat.label}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent History List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <History className="w-6 h-6 text-accent-400" />
              <span>Analysis History</span>
            </h2>
            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="glass p-12 rounded-3xl text-center text-gray-500">
                  No analysis history found. Start by analyzing some content!
                </div>
              ) : (
                history.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onSelect(item.result)}
                    className="glass p-6 rounded-2xl flex items-center justify-between hover:bg-white/5 cursor-pointer border border-white/5 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${item.result.trustScore >= 50 ? 'bg-accent-400/10 text-accent-400' : 'bg-red-500/10 text-red-400'}`}>
                        {item.result.trustScore >= 50 ? <ShieldCheck /> : <AlertTriangle />}
                      </div>
                      <div>
                        <h4 className="text-white font-bold truncate max-w-md">{item.input}</h4>
                        <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-black ${item.result.trustScore >= 50 ? 'text-accent-400' : 'text-red-400'}`}>
                        {item.result.trustScore}%
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions / Settings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Settings className="w-6 h-6 text-primary-400" />
              <span>Quick Settings</span>
            </h2>
            <div className="glass p-8 rounded-3xl space-y-6 border border-white/5">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium">Profile Public</span>
                </div>
                <div className="w-10 h-5 bg-accent-400/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-accent-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <LayoutDashboard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium">Auto-Save Analyses</span>
                </div>
                <div className="w-10 h-5 bg-accent-400/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-accent-400 rounded-full"></div>
                </div>
              </div>
              <button className="w-full py-4 bg-primary-600/10 hover:bg-primary-600/20 text-primary-400 rounded-xl font-bold transition-all">
                Update Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
