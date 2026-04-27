import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './GlassCard';

const Button = ({ children, className, variant = 'primary', icon, isLoading, ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/30 focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
    ghost: "text-text hover:bg-surface focus:ring-border",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading}
      {...props}
    >
      {/* Ripple/Glow effect overlay */}
      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : null}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;
