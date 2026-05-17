import React, { useState } from 'react';
import { Shield, History, User, Moon, Sun, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenHistory, isDarkMode, onToggleTheme, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl border border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-accent-400/10 rounded-lg group-hover:bg-accent-400/20 transition-all">
              <Shield className="w-6 h-6 text-accent-400" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              Veri<span className="text-accent-400">tas</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-accent-400 transition-colors">Instant Analysis</Link>
            <Link to="/metrics" className="text-sm font-medium text-gray-300 hover:text-accent-400 transition-colors">System Metrics</Link>
            {user && (
              <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-accent-400 transition-colors">Dashboard</Link>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onToggleTheme}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Night Mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button 
            onClick={onOpenHistory}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
              <Link to="/settings" className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all">
                <SettingsIcon className="w-5 h-5" />
              </Link>
              <Link to="/dashboard" className="w-10 h-10 rounded-full bg-accent-400 flex items-center justify-center text-primary-950 font-bold border-2 border-white/10 hover:scale-105 transition-all">
                {user.email[0].toUpperCase()}
              </Link>
            </div>
          ) : (
            <Link 
              to="/auth"
              className="hidden sm:flex px-6 py-2.5 bg-accent-400 hover:bg-accent-300 text-primary-950 text-sm font-bold rounded-xl transition-all shadow-lg shadow-accent-400/10 items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-accent-400">Home</Link>
              <Link to="/metrics" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-accent-400">System Metrics</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-accent-400">Dashboard</Link>
              <Link to="/settings" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-accent-400">Settings</Link>
              {!user && (
                <Link 
                  to="/auth" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-accent-400 text-primary-950 text-center font-bold rounded-xl"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
