import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Info, BarChart3, Fingerprint, BrainCircuit, ShieldAlert, HeartPulse, Activity } from 'lucide-react';

const AnalysisResult = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="glass p-12 rounded-3xl text-center">
          <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <BrainCircuit className="w-10 h-10 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Analyzing Content...</h2>
          <p className="text-gray-400 max-w-md mx-auto">Our AI is scanning for patterns of misinformation, emotional manipulation, and source credibility.</p>
          <div className="mt-12 max-w-lg mx-auto bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-accent-400/10 border-accent-400/20';
    if (score >= 50) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const getActionFeedback = (score) => {
    if (score >= 90) return "✅ Yes, this link is safe and verified. You can proceed with confidence.";
    if (score >= 75) return "✅ Generally safe, but remain cautious about minor biases.";
    if (score >= 50) return "⚠️ Proceed with caution. The content has mixed credibility.";
    if (score >= 30) return "🚨 Highly suspicious. We strongly recommend NOT interacting with this link.";
    return "🛑 NO! Never click on it. This is a confirmed threat.";
  };

  // Pentagonal spider radar calculations
  const angles = [-90, -18, 54, 126, 198];
  
  const getRadarPoint = (angle, score) => {
    const radius = (score / 100) * 40; // Max radius is 40
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad)
    };
  };

  const metrics = [
    { label: 'Accuracy', score: result.trustScore },
    { label: 'Calmness', score: 100 - (result.panicScore || 0) },
    { label: 'Source', score: result.weightedScoring?.apiScore || 50 },
    { label: 'Objectivity', score: 100 - (result.sentimentScores?.fear || 0) },
    { label: 'AI Certainty', score: result.nlpClassifierScore || 50 }
  ];

  // Concentric background grids
  const gridRadii = [10, 20, 30, 40];
  const gridPolygons = gridRadii.map(r => {
    return angles.map(a => {
      const rad = (a * Math.PI) / 180;
      return `${50 + r * Math.cos(rad)},${50 + r * Math.sin(rad)}`;
    }).join(' ');
  });

  // Data polygon points
  const dataPoints = metrics.map((m, idx) => {
    const pt = getRadarPoint(angles[idx], m.score);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 pb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <div className="lg:col-span-1">
          <div className={`glass p-8 rounded-3xl h-full border ${getScoreBg(result.trustScore)}`}>
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-6 ${getScoreBg(result.trustScore)}`}>
                {result.trustScore >= 50 ? (
                  <ShieldCheck className={`w-12 h-12 ${getScoreColor(result.trustScore)}`} />
                ) : (
                  <AlertTriangle className={`w-12 h-12 ${getScoreColor(result.trustScore)}`} />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">Credibility Rating</h3>
              <div className={`text-7xl font-black mb-4 ${getScoreColor(result.trustScore)}`}>
                {result.trustScore}%
              </div>
              <div className="mb-6 w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl shadow-lg">
                <p className={`text-sm font-bold ${getScoreColor(result.trustScore)}`}>
                  {getActionFeedback(result.trustScore)}
                </p>
              </div>
              <p className="text-gray-400 text-sm mb-8">
                {result.trustScore >= 80 
                  ? "Veritas analysis suggests this content is highly reliable." 
                  : result.trustScore >= 50 
                    ? "Warning: Moderate levels of bias or unverified claims detected." 
                    : "Critical: High probability of misinformation or harmful manipulation."}
              </p>

              <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all flex items-center justify-center space-x-2">
                <BarChart3 className="w-4 h-4 text-accent-400" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BrainCircuit className="w-6 h-6 text-accent-400" />
                <h3 className="text-2xl font-bold text-white">AI Verdict</h3>
              </div>
              <span className="px-3 py-1 bg-accent-400/10 text-accent-400 text-xs font-bold rounded-full border border-accent-400/20">
                Veritas-v4.0
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {result.reasoning}
            </p>
          </div>

          {/* 🛡️ Official Verification & Panic-Reduction Console */}
          <div className="glass p-8 rounded-3xl border border-white/5">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Left Column: Stunning SVG Spiderweb Radar Chart */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="mb-4 text-center">
                  <h4 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Fake News Signature Map</h4>
                  <p className="text-[10px] text-gray-500">Multi-dimensional semantic validation mapping</p>
                </div>
                
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                    {/* Radial grid circles/pentagons */}
                    {gridPolygons.map((points, idx) => (
                      <polygon 
                        key={idx} 
                        points={points} 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="0.3" 
                        strokeDasharray={idx === 3 ? "none" : "1,1"}
                        opacity={0.1 + (idx * 0.05)}
                      />
                    ))}
                    
                    {/* Axis lines */}
                    {angles.map((a, idx) => {
                      const endPt = getRadarPoint(a, 100);
                      return (
                        <line 
                          key={idx} 
                          x1="50" 
                          y1="50" 
                          x2={endPt.x} 
                          y2={endPt.y} 
                          stroke="#ffffff" 
                          strokeWidth="0.2" 
                          opacity="0.15" 
                        />
                      );
                    })}

                    {/* Glowing Filled Data Polygon */}
                    <polygon 
                      points={dataPoints} 
                      fill="url(#radar-gradient)" 
                      stroke="#c5a163" 
                      strokeWidth="1.2" 
                      className="drop-shadow-[0_0_8px_rgba(197,161,99,0.3)]"
                    />

                    {/* Render metric points */}
                    {metrics.map((m, idx) => {
                      const pt = getRadarPoint(angles[idx], m.score);
                      return (
                        <circle 
                          key={idx} 
                          cx={pt.x} 
                          cy={pt.y} 
                          r="1.2" 
                          fill="#030712" 
                          stroke="#c5a163" 
                          strokeWidth="0.8" 
                        />
                      );
                    })}

                    {/* Grid definitions */}
                    <defs>
                      <linearGradient id="radar-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#c5a163" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1a4d48" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {/* Positioned Label markers */}
                    {metrics.map((m, idx) => {
                      const labelPt = getRadarPoint(angles[idx], 120);
                      let textAnchor = "middle";
                      if (angles[idx] > -90 && angles[idx] < 90) textAnchor = "start";
                      else if (angles[idx] > 90 && angles[idx] < 270) textAnchor = "end";
                      
                      return (
                        <text 
                          key={idx} 
                          x={labelPt.x} 
                          y={labelPt.y + 2} 
                          fill="#9ca3af" 
                          fontSize="3.2" 
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor={textAnchor}
                        >
                          {m.label} ({m.score}%)
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Right Column: Panic index & Official message */}
              <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <HeartPulse className={`w-5 h-5 ${result.panicScore > 40 ? 'text-red-400 animate-pulse' : 'text-green-400 animate-ping'}`} />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Official Resource Safety Audit</span>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-3 mb-4">
                      <span className="text-sm font-mono font-bold text-white uppercase tracking-wider leading-snug">
                        {result.panicVerdict || "Calm / Fully Verified"}
                      </span>
                      <span className={`shrink-0 whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full border ${
                        result.panicScore > 40 
                          ? 'text-red-400 bg-red-400/10 border-red-400/20' 
                          : 'text-green-400 bg-green-400/10 border-green-400/20'
                      }`}>
                        Panic Index: {result.panicScore || 0}%
                      </span>
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed font-sans pt-1">
                      {result.panicAdvice || "This query contains no alarmist markers. Spread positivity, not panic!"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-accent-400" />
                <h4 className="font-bold text-white">Sentiment Dynamics</h4>
              </div>
              <div className="space-y-4">
                {result.sentimentScores && Object.entries(result.sentimentScores).map(([sentiment, score]) => {
                  const sentimentEmojis = {
                    fear: '😨',
                    anger: '😡',
                    joy: '😊',
                    sadness: '😢',
                    surprise: '😲'
                  };
                  return (
                    <div key={sentiment}>
                      <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest font-bold">
                        <span className="text-base" title={sentiment}>{sentimentEmojis[sentiment] || '😐'}</span>
                        <span className="text-gray-400">{score}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          className={`h-full ${
                            sentiment === 'fear' || sentiment === 'anger' ? 'bg-red-500' : 
                            sentiment === 'joy' ? 'bg-green-500' : 'bg-accent-400'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Core Plan: Weighted Scoring Model & DeBERTa NLP Classifier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Weighted scoring breakdown */}
            <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-accent-400" />
                  <h4 className="font-bold text-white">Weighted Scoring Model</h4>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  The trust score is dynamically computed from three core evaluation pillars aligned with our platform approach:
                </p>
                
                <div className="space-y-3">
                  {/* NLP weight */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest font-bold">
                      <span className="text-gray-500">NLP (BERT / DeBERTa) — Weight 30%</span>
                      <span className="text-accent-400">Score: {result.weightedScoring?.nlpScore || 38}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-400" style={{ width: `${result.weightedScoring?.nlpScore || 38}%` }}></div>
                    </div>
                  </div>

                  {/* Groq weight */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest font-bold">
                      <span className="text-gray-500">Groq Reasoning LLM — Weight 40%</span>
                      <span className="text-accent-400">Score: {result.weightedScoring?.groqScore || 40}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-400" style={{ width: `${result.weightedScoring?.groqScore || 40}%` }}></div>
                    </div>
                  </div>

                  {/* API weight */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest font-bold">
                      <span className="text-gray-500">Fact-Check API Cross-Check — Weight 30%</span>
                      <span className="text-accent-400">Score: {result.weightedScoring?.apiScore || 48}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-400" style={{ width: `${result.weightedScoring?.apiScore || 48}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span>Weighted Formula:</span>
                <span className="text-white">(NLP * 0.3) + (LLM * 0.4) + (API * 0.3) = {result.trustScore}%</span>
              </div>
            </div>

            {/* DeBERTa NLP Classifier */}
            <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Fingerprint className="w-5 h-5 text-accent-400" />
                  <h4 className="font-bold text-white">DeBERTa NLP Classification</h4>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Deep learning semantic sequence analysis predicts the statistical probability of textual manipulation:
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest font-bold text-red-400">
                      <span>Manipulation Probability</span>
                      <span>{100 - (result.nlpClassifierScore || 38)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${100 - (result.nlpClassifierScore || 38)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest font-bold text-green-400">
                      <span>Credibility Probability</span>
                      <span>{result.nlpClassifierScore || 38}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${result.nlpClassifierScore || 38}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 text-[10px] uppercase text-gray-500 tracking-wider">
                Model: DeBERTa-v3-large Classification Pipeline
              </div>
            </div>

          </div>

          {/* Factual Database Matches */}
          {result.factCheckMatches && result.factCheckMatches.length > 0 && (
            <div className="glass p-8 rounded-3xl border border-white/5">
              <div className="flex items-center space-x-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-accent-400" />
                <h4 className="text-xl font-bold text-white">Factual Database Cross-Check Matches</h4>
              </div>
              
              <div className="space-y-4">
                {result.factCheckMatches.map((match, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {match.url ? (
                          <a 
                            href={match.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs font-mono font-bold text-accent-400 hover:text-accent-300 hover:underline px-2 py-0.5 rounded bg-accent-400/10 inline-flex items-center space-x-1"
                          >
                            <span>{match.source}</span>
                            <span className="text-[10px]">🔗</span>
                          </a>
                        ) : (
                          <span className="text-xs font-mono font-bold text-accent-400 px-2 py-0.5 rounded bg-accent-400/10">
                            {match.source}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">Database Match Verified</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed pt-1">
                        {match.details}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        match.verdict === 'False' || match.verdict === 'Mostly False'
                          ? 'text-red-400 bg-red-400/10 border-red-400/20'
                          : 'text-green-400 bg-green-400/10 border-green-400/20'
                      }`}>
                        Verdict: {match.verdict}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-primary-900/20 border border-accent-400/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <ShieldCheck className="w-32 h-32 text-accent-400" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span className="text-accent-400">🛡️</span>
                  <span>Impact & Context</span>
                </h4>
                <p className="text-gray-400 text-sm max-w-xl">
                  {result.manipulationDescription}
                </p>
              </div>
              <button className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Flag Misinformation</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
