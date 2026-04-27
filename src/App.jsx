import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DomainSelection from './pages/DomainSelection';
import ProgressTracker from './pages/ProgressTracker';
import AiChat from './pages/AiChat';
import Profile from './pages/Profile';

// Layout
import Navbar from './components/layout/Navbar';
import ParticlesBackground from './components/effects/ParticlesBackground';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/domains" element={<DomainSelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/chat" element={<AiChat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
          {/* Background Elements */}
          <ParticlesBackground />
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-blob"></div>
            <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] rounded-full bg-secondary/20 blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] animate-blob animation-delay-4000"></div>
          </div>

          <Navbar />
          
          <main className="flex-1 relative z-10 p-4 md:p-8 pt-24 max-w-7xl mx-auto w-full">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
