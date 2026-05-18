import React, { useState, useRef } from 'react';
import { Search, Sparkles, ArrowRight, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Tesseract from 'tesseract.js';

const Hero = ({ onAnalyze }) => {
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
      // Auto-analyze if text is found
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
    <div className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decor: Topic-Related Blurred News Collage & Glowing Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* News Collage Background Image with High Blur & Subtle Opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] filter blur-[8px] scale-105"
          style={{ backgroundImage: `url('/news_bg.png')` }}
        />

        {/* SVG Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Radial Gradients (Cybersecurity style) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#0b2d2a,transparent)] opacity-40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,#1b1812,transparent)] opacity-40"></div>
        
        {/* Glowing floating blobs */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] bg-primary-500/15 rounded-full blur-[130px]"
        />
        
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-accent-400/8 rounded-full blur-[150px]"
        />

        {/* Soft bottom transition mask */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-400/10 border border-accent-400/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-widest">Digital Credibility Verification Platform</span>
          </div>
          
          <h1 className="text-[6rem] md:text-[10rem] lg:text-[13rem] font-bold tracking-tighter text-white mb-4 leading-none">
            Veri<span className="text-accent-400">tas</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-serif tracking-wide">
            In an age of information overload, truth needs a champion. <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500 drop-shadow-lg mx-1">Veritas</span> uses advanced AI to separate fact from fiction instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
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
    </div>
  );
};

export default Hero;
