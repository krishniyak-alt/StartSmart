import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { useAppContext } from '../context/AppContext';
import { DOMAINS, ROADMAPS } from '../data/mockData';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const ProgressTracker = () => {
  const { selectedDomain, progress } = useAppContext();

  if (!selectedDomain) {
    return <Navigate to="/domains" />;
  }

  const domainInfo = DOMAINS.find(d => d.id === selectedDomain);
  const roadmap = ROADMAPS[selectedDomain] || [];
  
  const completedCount = roadmap.filter(topic => progress[topic.id]).length;
  const progressPercentage = roadmap.length > 0 ? (completedCount / roadmap.length) * 100 : 0;
  const isAllComplete = progressPercentage === 100 && roadmap.length > 0;

  useEffect(() => {
    if (isAllComplete) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isAllComplete]);

  return (
    <PageTransition>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Learning Progress</h1>
          <p className="text-text-muted">Track your milestones and stay motivated.</p>
        </div>

        <GlassCard className="p-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-text-muted mb-1">Overall Completion</p>
              <p className="text-4xl font-bold" style={{ color: domainInfo.color }}>
                {Math.round(progressPercentage)}%
              </p>
            </div>
            <p className="text-text-muted text-sm">
              {completedCount} of {roadmap.length} topics completed
            </p>
          </div>
          
          <div className="h-6 w-full bg-surface rounded-full overflow-hidden border border-border shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ backgroundColor: domainInfo.color }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }}></div>
            </motion.div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Completed Topics
            </h3>
            <ul className="space-y-3">
              {roadmap.filter(t => progress[t.id]).map(topic => (
                <li key={topic.id} className="text-text-muted line-through">
                  {topic.title}
                </li>
              ))}
              {completedCount === 0 && <p className="text-sm text-text-muted italic">No topics completed yet. Keep going!</p>}
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              Remaining Topics
            </h3>
            <ul className="space-y-3">
              {roadmap.filter(t => !progress[t.id]).map((topic, index) => (
                <li key={topic.id} className={`flex items-center gap-2 ${index === 0 ? 'text-primary font-medium' : 'text-text'}`}>
                  {index === 0 && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Next</span>}
                  {topic.title}
                </li>
              ))}
              {isAllComplete && <p className="text-sm text-green-500 font-medium">All topics completed! You are ready for the next level.</p>}
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProgressTracker;
