import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/domains');
  };

  return (
    <PageTransition className="flex items-center justify-center min-h-[80vh]">
      <GlassCard className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">StartSmart</span>
          </h1>
          <p className="text-text-muted">
            {isLogin ? 'Sign in to continue your journey' : 'Create an account to start learning'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary text-text transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary text-text transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full mt-6">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:text-secondary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </GlassCard>
    </PageTransition>
  );
};

export default Login;
