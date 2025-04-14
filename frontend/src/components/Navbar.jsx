import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Add Workout', href: '/addworkout' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0a0a0a] border-b border-zinc-800 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-black text-zinc-100 tracking-wider"
        >
          JIM BOI
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ 
                scale: 1.05,
                color: '#ffffff'
              }}
              className="text-zinc-400 hover:text-white transition-colors duration-300 text-base font-medium"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#27272a',
              cursor:"pointer"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-zinc-800 text-zinc-200 px-6 py-2 rounded-lg font-semibold 
            hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
          >
            Get Started
          </motion.button>
        </div>

        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="text-zinc-300 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3
                  }}
                  className="text-2xl text-zinc-400 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#27272a'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className="bg-zinc-800 text-zinc-200 px-8 py-3 rounded-lg font-semibold 
                hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Outlet/>
    </nav>
  );
}

export default Navbar;
