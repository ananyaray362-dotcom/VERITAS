import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Moon, Sun, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-12">Platform Settings</h1>

        <div className="space-y-6">
          {[
            { icon: User, label: 'Profile Information', desc: 'Update your name, email, and avatar.' },
            { icon: Shield, label: 'Security & Privacy', desc: 'Manage passwords and 2FA settings.' },
            { icon: Bell, label: 'Notifications', desc: 'Configure how you receive alerts.' },
            { icon: Globe, label: 'Language & Region', desc: 'Change the platform language.' },
            { icon: Moon, label: 'Display Mode', desc: 'Switch between Dark and Light mode.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-accent-400/10 transition-all">
                  <item.icon className="w-6 h-6 text-gray-400 group-hover:text-accent-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{item.label}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="p-2 text-gray-600 group-hover:text-white transition-all">
                <Globe className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-end space-x-4">
          <button className="px-8 py-3 rounded-xl border border-white/10 text-gray-400 font-bold hover:bg-white/5 transition-all">
            Cancel
          </button>
          <button className="px-8 py-3 rounded-xl bg-accent-400 text-primary-950 font-bold hover:bg-accent-300 transition-all shadow-lg shadow-accent-400/20">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
