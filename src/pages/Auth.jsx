import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Globe, Shield, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for confirmation!');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDemoLogin = () => {
    const mockSession = {
      user: {
        email: 'hackathon.judge@veritas.ai',
        id: 'demo-user-123'
      }
    };
    localStorage.setItem('veritas_demo_session', JSON.stringify(mockSession));
    window.location.reload();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-8 rounded-3xl border border-white/10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-accent-400/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-accent-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {isLogin ? 'Welcome to Veritas' : 'Join the Truth'}
          </h2>
          <p className="text-gray-400 mt-2">
            {isLogin ? 'Sign in to access your dashboard' : 'Create an account to start verifying'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-accent-400/50 transition-all outline-none"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-accent-400/50 transition-all outline-none"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-accent-400 hover:bg-accent-300 text-primary-950 font-bold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-accent-400/20"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#030712] text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button 
            type="button"
            onClick={signInWithGoogle}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center justify-center space-x-3"
          >
            <Globe className="w-5 h-5 text-red-400" />
            <span>Sign in with Google</span>
          </button>

          <button 
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3.5 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-300 hover:to-accent-400 text-primary-950 font-black rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-accent-400/20"
          >
            <span>⚡ Instant Hackathon Demo Login</span>
          </button>
        </div>

        <p className="text-center mt-8 text-gray-400 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent-400 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
