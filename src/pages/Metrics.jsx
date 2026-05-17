import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, AlertCircle, CheckCircle, XCircle, Timer, Cpu, Star, Zap, Database, Globe } from 'lucide-react';

const Metrics = () => {
  const topStats = [
    { label: 'Accuracy', value: '92%', sub: 'Fake News Detection', icon: Shield, color: 'text-accent-400', bg: 'bg-accent-400/10' },
    { label: 'OCR Accuracy', value: '95%', sub: 'Text Extraction', icon: Sparkles, color: 'text-primary-400', bg: 'bg-primary-400/10' },
    { label: 'Avg. Latency', value: '2-4s', sub: 'Per Analysis', icon: Timer, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Efficiency', value: '89%', sub: 'Resource Utilization', icon: Cpu, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'User Satisfaction', value: '4.6/5', sub: 'User Rating', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Throughput', value: '120+', sub: 'Analyses / Hour', icon: Zap, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  const accuracyData = [
    { name: 'Veritas (Ours)', value: 92, color: 'bg-accent-400' },
    { name: 'Google Fact Check', value: 75, color: 'bg-primary-500' },
    { name: 'Factly', value: 72, color: 'bg-primary-700' },
    { name: 'Truecaller News', value: 65, color: 'bg-red-500/80' },
  ];

  const ocrConditions = [
    { condition: 'Clear Image', value: 98 },
    { condition: 'Good Lighting', value: 95 },
    { condition: 'Low Lighting', value: 90 },
    { condition: 'Blurred Image', value: 88 },
    { condition: 'Handwritten', value: 82 },
  ];

  const userFeedback = [
    { metric: 'Ease of Use', value: '4.7/5', pct: 94 },
    { metric: 'Accuracy', value: '4.6/5', pct: 92 },
    { metric: 'Speed', value: '4.5/5', pct: 90 },
    { metric: 'Explanation Quality', value: '4.6/5', pct: 92 },
    { metric: 'Overall Experience', value: '4.6/5', pct: 92 },
  ];

  const comparisonFeatures = [
    { feature: 'URL Verification', veritas: true, google: true, factly: true, truecaller: true, newsguard: true, snopes: true },
    { feature: 'Screenshot Analysis', veritas: true, google: false, factly: false, truecaller: false, newsguard: true, snopes: false },
    { feature: 'OCR Support', veritas: true, google: 'Limited', factly: false, truecaller: false, newsguard: 'Limited', snopes: false },
    { feature: 'AI Reasoning (Groq LLM)', veritas: true, google: false, factly: false, truecaller: 'Limited', newsguard: false, snopes: false },
    { feature: 'Bias & Emotion Detection', veritas: true, google: false, factly: false, truecaller: false, newsguard: false, snopes: false },
    { feature: 'Trust Score', veritas: true, google: 'Limited', factly: 'Limited', truecaller: 'Limited', newsguard: true, snopes: 'Limited' },
    { feature: 'Real-time Analysis', veritas: true, google: true, factly: 'Limited', truecaller: 'Limited', newsguard: true, snopes: false },
    { feature: 'Multi-input (URL/Text/Image)', veritas: true, google: false, factly: false, truecaller: false, newsguard: false, snopes: false },
  ];

  const renderIcon = (status) => {
    if (status === true) return <CheckCircle className="w-5 h-5 text-accent-400 mx-auto" />;
    if (status === false) return <XCircle className="w-5 h-5 text-red-500/80 mx-auto" />;
    return <span className="text-[11px] font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded uppercase tracking-wider">{status}</span>;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-8 h-8 text-accent-400 animate-pulse" />
              <h1 className="text-4xl font-light tracking-wide text-accent-100 font-serif">
                Performance Metrics Overview
              </h1>
            </div>
            <p className="text-gray-400">Veritas AI-Powered Fake News Detection System Performance Analysis</p>
          </div>
          <div className="flex items-center space-x-2 bg-accent-400/10 border border-accent-400/20 px-4 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-widest">Global View - Q2 2026</span>
          </div>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {topStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-400 font-medium">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts & Graphs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Accuracy Comparison */}
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">Accuracy Comparison</h3>
              <p className="text-xs text-gray-500">Fake News Detection Performance benchmark</p>
            </div>
            <div className="space-y-6">
              {accuracyData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className={idx === 0 ? 'text-accent-400' : 'text-gray-400'}>{item.name}</span>
                    <span className="text-white">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latency & Throughput Waves (SVG Visualizers) */}
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Latency Distribution</h3>
              <p className="text-xs text-gray-500">Response time vs. percentage of requests</p>
            </div>
            <div className="relative h-44 my-4 flex items-end">
              {/* Custom SVG Line Chart */}
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient-wave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c5a163" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c5a163" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 25 Q 20 18, 40 5 T 80 20 T 100 28" fill="url(#gradient-wave)" />
                <path d="M 0 25 Q 20 18, 40 5 T 80 20 T 100 28" fill="none" stroke="#c5a163" strokeWidth="1.5" />
                {/* Nodes */}
                <circle cx="40" cy="5" r="1.5" fill="#030712" stroke="#c5a163" strokeWidth="1" />
                <circle cx="65" cy="12" r="1.5" fill="#030712" stroke="#c5a163" strokeWidth="1" />
              </svg>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-accent-400/20 text-accent-300 text-[10px] px-2 py-0.5 rounded-full border border-accent-400/30">
                Peak: 2-3s (40% of requests)
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase tracking-wider">
              <span>0-1s</span>
              <span>1-2s</span>
              <span>2-3s</span>
              <span>3-4s</span>
              <span>4-5s</span>
            </div>
          </div>

          {/* Efficiency resource utilization */}
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Efficiency Distribution</h3>
              <p className="text-xs text-gray-500">Resource allocation & computational split</p>
            </div>
            <div className="flex items-center justify-center my-4 relative">
              {/* Donut Chart representation */}
              <div className="w-32 h-32 rounded-full border-[12px] border-white/5 border-t-accent-400 border-r-primary-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">89%</div>
                  <div className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Optimized</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-400"></div>
                <span>AI Inference (40%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                <span>Data Processing (30%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* OCR Conditions */}
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">OCR Accuracy under Different Conditions</h3>
              <p className="text-xs text-gray-500">Visual degradation adaptation test</p>
            </div>
            <div className="space-y-4 my-6">
              {ocrConditions.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-gray-400">{item.condition}</span>
                    <span className="text-accent-400">{item.value}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-400" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Throughput Analyes */}
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Throughput Rate</h3>
              <p className="text-xs text-gray-500">Analyses throughput per hour over 7 days</p>
            </div>
            <div className="relative h-44 my-4 flex items-end">
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M 0 28 L 15 25 L 30 22 L 45 18 L 60 14 L 75 10 L 90 8 L 100 5" fill="none" stroke="#5b9993" strokeWidth="1.5" />
                {/* Glowing target nodes */}
                <circle cx="100" cy="5" r="2" fill="#5b9993" className="animate-ping" />
                <circle cx="100" cy="5" r="1.5" fill="#5b9993" />
              </svg>
              <div className="absolute top-2 right-2 bg-primary-500/20 text-primary-300 text-[10px] px-2 py-0.5 rounded-full border border-primary-500/30">
                148/hr peak
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase tracking-wider">
              <span>Day 1</span>
              <span>Day 2</span>
              <span>Day 3</span>
              <span>Day 4</span>
              <span>Day 5</span>
              <span>Day 6</span>
              <span>Day 7</span>
            </div>
          </div>

          {/* User Feedback */}
          <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">User Feedback Summary</h3>
              <p className="text-xs text-gray-500">UX benchmark satisfaction indices</p>
            </div>
            <div className="space-y-4 my-4">
              {userFeedback.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-gray-400">{item.metric}</span>
                    <span className="text-accent-400">{item.value}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-400" style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Feature Comparison Table */}
        <div className="glass p-8 rounded-3xl border border-white/5 mb-12 overflow-x-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-1">Comparison with Existing Solutions</h3>
            <p className="text-sm text-gray-500">Why Veritas leads the next generation of misinformation detection platforms</p>
          </div>
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="py-4">Features</th>
                <th className="py-4 text-center text-accent-400 bg-accent-400/5 rounded-t-xl">Veritas (Ours)</th>
                <th className="py-4 text-center">Google Fact Check</th>
                <th className="py-4 text-center">Factly</th>
                <th className="py-4 text-center">Truecaller News</th>
                <th className="py-4 text-center">NewsGuard</th>
                <th className="py-4 text-center">Snopes</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="py-4 font-medium text-gray-300">{row.feature}</td>
                  <td className="py-4 text-center bg-accent-400/5">{renderIcon(row.veritas)}</td>
                  <td className="py-4 text-center">{renderIcon(row.google)}</td>
                  <td className="py-4 text-center">{renderIcon(row.factly)}</td>
                  <td className="py-4 text-center">{renderIcon(row.truecaller)}</td>
                  <td className="py-4 text-center">{renderIcon(row.newsguard)}</td>
                  <td className="py-4 text-center">{renderIcon(row.snopes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Status metadata */}
        <div className="glass p-6 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-gray-500 font-bold uppercase tracking-wider">
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-accent-400" />
            <div>
              <div className="text-[10px] text-gray-400">Datasets Used</div>
              <div className="text-white text-[11px]">News APIs, Fact DBs, Social Posts</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Cpu className="w-5 h-5 text-primary-400" />
            <div>
              <div className="text-[10px] text-gray-400">Underlying Model</div>
              <div className="text-white text-[11px]">Groq LLM + Tesseract OCR</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-[10px] text-gray-400">Languages Supported</div>
              <div className="text-white text-[11px]">English, Bengali & 10+ More</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-[10px] text-gray-400">Platform Status</div>
              <div className="text-white text-[11px]">Optimal & Verified</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Metrics;
