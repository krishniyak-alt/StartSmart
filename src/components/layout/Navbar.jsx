import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Compass, LineChart, MessageSquare, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useAppContext();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Domains', path: '/domains', icon: <Compass size={20} /> },
    { name: 'Progress', path: '/progress', icon: <LineChart size={20} /> },
    { name: 'AI Chat', path: '/chat', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              StartSmart
            </NavLink>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative
                  ${isActive ? 'text-primary' : 'text-text hover:text-primary'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.icon}
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary rounded-t-md"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-secondary" />}
            </button>
          </div>

          <div className="-mr-2 flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-secondary" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text hover:text-primary hover:bg-surface focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresenceMobile isOpen={isOpen} links={links} closeMenu={closeMenu} />
    </nav>
  );
};

const AnimatePresenceMobile = ({ isOpen, links, closeMenu }) => (
  <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    variants={{
      open: { opacity: 1, height: "auto" },
      closed: { opacity: 0, height: 0 }
    }}
    className="md:hidden overflow-hidden glass"
  >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={closeMenu}
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium
            ${isActive ? 'bg-primary/20 text-primary' : 'text-text hover:bg-surface hover:text-primary'}`
          }
        >
          {link.icon}
          <span>{link.name}</span>
        </NavLink>
      ))}
    </div>
  </motion.div>
);

export default Navbar;
