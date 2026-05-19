import React from 'react';
import { Sparkles, ArrowRight, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] filter blur-[8px] scale-105"
          style={{ backgroundImage: `url('/news_bg.png')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#0b2d2a,transparent)] opacity-40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,#1b1812,transparent)] opacity-40"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] bg-primary-500/15 rounded-full blur-[130px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-accent-400/8 rounded-full blur-[150px]"
        />
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
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-serif tracking-wide">
            In an age of information overload, truth needs a champion. <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500 drop-shadow-lg mx-1">Veritas</span> uses advanced AI to separate fact from fiction instantly.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
          className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8"
        >
          {/* Card 1: Analysis */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass p-8 rounded-3xl border border-white/10 backdrop-blur-xl bg-gray-950/40 flex flex-col h-full shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Uncover the Truth</h2>
            <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
              Verify articles, detect hidden biases, and check claims against our trusted knowledge base with a single click. Ready to analyze your first piece of news?
            </p>
            <Link 
              to="/analyze"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-primary-950 transition-all duration-300 bg-accent-400 rounded-xl hover:bg-accent-300 active:scale-95 shadow-xl shadow-accent-400/20 group w-full"
            >
              <span>Start Instant Analysis</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Card 2: Chatbot */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass p-8 rounded-3xl border border-white/10 backdrop-blur-xl bg-gray-950/40 flex flex-col h-full shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Veritas AI Advisor</h2>
            <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
              Clicked a suspicious link? Not sure what to do next? Chat with our AI security advisor to get immediate guidance and protective measures.
            </p>
            <Link 
              to="/chat"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-primary-950 transition-all duration-300 bg-accent-400 rounded-xl hover:bg-accent-300 active:scale-95 shadow-xl shadow-accent-400/20 group w-full"
            >
              <Bot className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Talk to Advisor</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
