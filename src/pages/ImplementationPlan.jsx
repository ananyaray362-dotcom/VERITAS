import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle, Database, Cpu, Search, HelpCircle, Code, Layers, FileText } from 'lucide-react';

const ImplementationPlan = () => {
  const objectives = [
    "Detect fake news and misinformation from multiple sources.",
    "Provide real-time analysis with explainable AI reasoning.",
    "Support multi-input: URL, Text, Screenshot.",
    "Generate Trust Score with factual verification."
  ];

  const steps = [
    { label: 'Data Acquisition', desc: 'Collect news from multiple sources (URL / Text / Image)', icon: Database, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Preprocessing', desc: 'Text extraction (OCR), cleaning, normalization', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'AI Analysis', desc: 'NLP + ML model analyzes content credibility', icon: Cpu, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Fact Verification', desc: 'Cross-check with trusted APIs & databases', icon: Shield, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Output Generation', desc: 'Trust score, label (Real / Fake) & explanation', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-400/10' }
  ];

  const algorithms = [
    { name: 'NLP Model', details: 'BERT-based / DeBERTa for text classification (fake vs real)', icon: Cpu, color: 'text-purple-400' },
    { name: 'GROQ LLM', details: 'For deep reasoning, claim verification & explainable output', icon: Code, color: 'text-accent-400' },
    { name: 'OCR (Tesseract)', details: 'Extract text from screenshots & images', icon: Search, color: 'text-blue-400' },
    { name: 'Fact Verification', details: 'Cross-check claims with trusted news & fact-check APIs', icon: Shield, color: 'text-green-400' },
    { name: 'Scoring Algorithm', details: 'Weighted scoring based on credibility, source reliability, sentiment & fact-check results', icon: Layers, color: 'text-cyan-400' }
  ];

  const implementationSteps = [
    "Collect datasets (news, fact-check, social data)",
    "Build OCR & Text preprocessing pipeline",
    "Train / Fine-tune NLP classification model",
    "Integrate GROQ LLM for reasoning & explanation",
    "Connect Fact Check & News APIs",
    "Generate trust score & results",
    "Build Frontend Dashboard",
    "Deploy & Optimize for Performance"
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Block */}
        <div className="text-center mb-16 border-b border-white/10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-400/10 border border-accent-400/20 mb-4"
          >
            <Shield className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-widest">Platform Strategy</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-accent-100 font-serif mb-4">
            Core Implementation Plan
          </h1>
          <p className="text-gray-400 font-serif italic max-w-2xl mx-auto text-lg">
            AI-Powered Fake News Detection System — VERITAS
          </p>
        </div>

        {/* Top Section Grid (Objective & Core Approach) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* 1. OBJECTIVE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Objective</h3>
              </div>
              <ul className="space-y-4">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 2. CORE APPROACH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-3xl border border-white/5 lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Core Approach</h3>
              </div>
              
              {/* Process Steps Visual Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col items-center text-center p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all duration-300">
                    <div className={`p-4 rounded-xl mb-4 ${step.bg} ${step.color} group-hover:scale-110 transition-all duration-300`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">{step.label}</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</p>
                    
                    {/* Visual Connection Arrow */}
                    {idx < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                        <ArrowRight className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Section Grid (Key Algorithms & Implementation Steps) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 3. KEY ALGORITHMS / MODELS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Key Algorithms / Models</h3>
            </div>
            
            <div className="space-y-4">
              {algorithms.map((algo, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className={`p-3 rounded-xl bg-white/5 ${algo.color}`}>
                    <algo.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{algo.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{algo.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 4. IMPLEMENTATION STEPS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Implementation Steps</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {implementationSteps.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-accent-400/20 text-accent-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-gray-300 font-medium leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default ImplementationPlan;
