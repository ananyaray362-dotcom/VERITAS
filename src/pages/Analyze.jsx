import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tesseract from 'tesseract.js';
import AnalysisResult from '../components/AnalysisResult';

const Analyze = ({ onAnalyze, loading, result }) => {
  const [input, setInput] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingImage(true);
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      setInput(text);
      if (text.trim()) {
        onAnalyze(text);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to read text from image.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-400/10 border border-accent-400/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-widest">Analysis Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-none">
            Instant Analysis
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Paste an article URL, text excerpt, or upload a screenshot to instantly verify credibility, detect bias, and check facts against trusted sources.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-3xl mx-auto mt-12"
        >
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-0 bg-accent-400/20 rounded-2xl blur-2xl group-hover:bg-accent-400/30 transition-all duration-500 opacity-30"></div>
            <div className="relative flex items-center p-2.5 bg-primary-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl focus-within:border-accent-400/50 transition-all duration-300">
              <div className="pl-4 flex items-center">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-accent-400"
                  title="Upload image for OCR"
                  disabled={isProcessingImage}
                >
                  {isProcessingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste news URL, text, or upload evidence..."
                className="w-full bg-transparent border-none focus:ring-0 text-white px-5 py-5 placeholder:text-gray-600 text-xl"
              />
              <button 
                type="submit"
                className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-primary-950 transition-all duration-300 bg-accent-400 rounded-xl hover:bg-accent-300 active:scale-95 shadow-xl shadow-accent-400/20 group overflow-hidden"
              >
                <span>Analyze</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-primary-500" />
              <span>Fake News Detection</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-accent-500" />
              <span>Bias Analysis</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-primary-400" />
              <span>Credibility Score</span>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {(loading || result) && (
          <AnalysisResult loading={loading} result={result} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analyze;
