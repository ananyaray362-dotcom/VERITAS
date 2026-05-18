import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Globe, Activity, Crosshair, ShieldCheck } from 'lucide-react';

const BackgroundGraphic = ({ isDarkMode }) => {
  const iconColor = isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid Pattern representing structured data */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)
          `
        }}
      />
      

      {/* Floating Detection & News Graphics */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] left-[10%]"
      >
        <Crosshair size={240} color={iconColor} strokeWidth={0.5} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] right-[10%]"
      >
        <FileText size={180} color={iconColor} strokeWidth={0.5} />
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[30%] right-[25%]"
      >
        <Globe size={300} color={iconColor} strokeWidth={0.2} />
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[15%] left-[20%]"
      >
        <Activity size={160} color={iconColor} strokeWidth={0.5} />
      </motion.div>
      
      {/* Vignette effect to blend seamlessly with the app background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 10%, ${isDarkMode ? '#030712' : '#f9fafb'} 90%)`
        }}
      />
    </div>
  );
};

export default BackgroundGraphic;
