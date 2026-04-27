import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { DOMAINS, ROADMAPS } from '../data/mockData';
import { CheckCircle, Circle, Play, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { selectedDomain, progress, markTopicComplete } = useAppContext();
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null); // 'success' or 'error'

  if (!selectedDomain) {
    return <Navigate to="/domains" />;
  }

  const domainInfo = DOMAINS.find(d => d.id === selectedDomain);
  const roadmap = ROADMAPS[selectedDomain] || [];
  
  const completedCount = roadmap.filter(topic => progress[topic.id]).length;
  const progressPercentage = roadmap.length > 0 ? (completedCount / roadmap.length) * 100 : 0;
  
  const currentTopicIndex = roadmap.findIndex(topic => !progress[topic.id]);
  const currentTopic = currentTopicIndex !== -1 ? roadmap[currentTopicIndex] : null;

  const handleTakeQuiz = () => {
    setShowQuiz(true);
    setSelectedAnswer(null);
    setQuizResult(null);
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === null || !currentTopic?.quiz) return;
    
    if (selectedAnswer === currentTopic.quiz.correctAnswer) {
      setQuizResult('success');
      setTimeout(() => {
        markTopicComplete(currentTopic.id);
        setShowQuiz(false);
      }, 1500);
    } else {
      setQuizResult('error');
    }
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        
        {/* Hero Section */}
        <GlassCard className="p-8 border-l-4" style={{ borderLeftColor: domainInfo.color }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{domainInfo.title} Journey</h1>
              <p className="text-text-muted">{domainInfo.description}</p>
            </div>
            <div className="w-full md:w-64">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-3 w-full bg-surface rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: domainInfo.color }}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Learning Content */}
          <div className="lg:col-span-2 space-y-8">
            {currentTopic ? (
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Current Topic</h2>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Up Next
                  </span>
                </div>
                <h3 className="text-xl mb-2">{currentTopic.title}</h3>
                <p className="text-text-muted mb-6">{currentTopic.description}</p>
                
                {currentTopic.videoId ? (
                  <div className="aspect-video bg-surface rounded-xl overflow-hidden border border-border mb-6 shadow-xl">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${currentTopic.videoId}`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-surface rounded-xl flex items-center justify-center border border-border mb-6 group relative overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Play size={32} className="text-white ml-2" />
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!showQuiz ? (
                    <motion.div 
                      key="take-quiz"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="flex justify-end"
                    >
                      <Button onClick={handleTakeQuiz}>
                        Take Quiz to Complete
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="quiz-section"
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-background rounded-xl p-6 border border-border overflow-hidden"
                    >
                      <h4 className="text-lg font-bold mb-4">Knowledge Check</h4>
                      {currentTopic.quiz ? (
                        <>
                          <p className="mb-4">{currentTopic.quiz.question}</p>
                          <div className="space-y-3 mb-6">
                            {currentTopic.quiz.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedAnswer(idx)}
                                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                                  selectedAnswer === idx 
                                    ? 'border-primary bg-primary/10 text-primary' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          
                          {quizResult === 'success' && (
                            <div className="mb-4 p-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg flex items-center gap-2">
                              <CheckCircle size={18} /> Correct! Unlocking next topic...
                            </div>
                          )}
                          
                          {quizResult === 'error' && (
                            <div className="mb-4 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg flex items-center gap-2">
                              <AlertCircle size={18} /> Incorrect. Try again!
                            </div>
                          )}

                          <div className="flex gap-3 justify-end">
                            <Button variant="ghost" onClick={() => setShowQuiz(false)}>Cancel</Button>
                            <Button onClick={handleSubmitQuiz} disabled={selectedAnswer === null || quizResult === 'success'}>
                              Submit Answer
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-text-muted">No quiz available for this topic.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            ) : (
              <GlassCard className="text-center py-16">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                <p className="text-text-muted">You have completed the entire roadmap for {domainInfo.title}.</p>
              </GlassCard>
            )}
          </div>

          {/* Roadmap Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold px-2">Roadmap</h2>
            <div className="space-y-4 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border -z-10"></div>
              
              {roadmap.map((topic, index) => {
                const isCompleted = progress[topic.id];
                const isCurrent = currentTopic?.id === topic.id;
                
                return (
                  <div key={topic.id} className={`flex gap-4 p-3 rounded-xl transition-colors ${isCurrent ? 'bg-surface border border-primary/30 shadow-lg' : ''}`}>
                    <div className="mt-1 bg-background">
                      {isCompleted ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full border-4 border-primary bg-background shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      ) : (
                        <Circle className="text-text-muted" size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className={`font-medium ${isCompleted ? 'text-text-muted line-through' : isCurrent ? 'text-primary' : ''}`}>
                        {topic.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Dashboard;
