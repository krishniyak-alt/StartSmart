import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ThreeIcon from '../components/effects/ThreeIcon';
import { DOMAINS } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const DomainSelection = () => {
  const [query, setQuery] = useState('');
  const [suggestedDomain, setSuggestedDomain] = useState(null);
  const { setSelectedDomain } = useAppContext();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query) return;
    const lowerQuery = query.toLowerCase();
    
    // Simple matching logic
    let bestMatch = null;
    let maxScore = 0;

    DOMAINS.forEach(domain => {
      let score = 0;
      domain.keywords.forEach(kw => {
        if (lowerQuery.includes(kw)) score++;
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = domain;
      }
    });

    setSuggestedDomain(bestMatch || DOMAINS[0]);
  };

  const handleSelectDomain = (domainId) => {
    setSelectedDomain(domainId);
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-lg text-text-muted">
            Select a domain to start your personalized learning journey, or let our AI suggest one based on your interests.
          </p>
        </div>

        {/* Confusion Solver */}
        <GlassCard className="max-w-3xl mx-auto p-2">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="E.g., I like making websites look good..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-text transition-all"
              />
            </div>
            <Button onClick={handleSearch} icon={<Sparkles size={18} />} className="w-full md:w-auto">
              Suggest Domain
            </Button>
          </div>
          
          <AnimatePresence>
            {suggestedDomain && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-8 pb-6 pt-2"
              >
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">We suggest: {suggestedDomain.title}</h3>
                    <p className="text-sm text-text-muted">{suggestedDomain.description}</p>
                  </div>
                  <Button onClick={() => handleSelectDomain(suggestedDomain.id)} variant="primary">
                    Start Learning
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOMAINS.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="h-32 mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-2xl bg-gradient-to-b from-surface to-transparent relative">
                   <ThreeIcon color={domain.color} />
                </div>
                <h3 className="text-xl font-bold mb-2">{domain.title}</h3>
                <p className="text-text-muted text-sm flex-1 mb-6">
                  {domain.description}
                </p>
                <Button 
                  onClick={() => handleSelectDomain(domain.id)}
                  variant="outline" 
                  className="w-full mt-auto"
                  icon={<ArrowRight size={18} />}
                >
                  Select Domain
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default DomainSelection;
