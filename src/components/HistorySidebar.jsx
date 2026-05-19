import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X, Trash2, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

const HistorySidebar = ({ history, isOpen, onClose, onSelect, onClear }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-md bg-gray-950 border-r border-white/10 z-[70] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gray-900/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-400/10 rounded-lg">
                  <History className="w-5 h-5 text-accent-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Analysis History</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">No history yet</h3>
                  <p className="text-gray-500 text-sm">Your recent analysis results will appear here for quick access.</p>
                </div>
              ) : (
                history.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onSelect(item.result);
                      onClose();
                    }}
                    className="glass p-4 rounded-2xl cursor-pointer hover:bg-white/5 border border-white/5 hover:border-accent-400/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {item.result.trustScore >= 50 ? (
                          <ShieldCheck className="w-4 h-4 text-accent-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm font-bold ${item.result.trustScore >= 50 ? 'text-accent-400' : 'text-red-400'}`}>
                          {item.result.trustScore}% Trust
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-2 group-hover:text-white transition-colors">
                      {item.input}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-gray-900/50">
                <button 
                  onClick={onClear}
                  className="w-full py-3 px-4 rounded-xl border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-all flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear History</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;
