import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, GraduationCap, Github, Map, BookOpen, ExternalLink, AlertCircle, Menu, X } from 'lucide-react';
import HomeView from './components/HomeView.jsx';
import AnalysisView from './components/AnalysisView.jsx';
import WebGISView from './components/WebGISView.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav configuration
  const navItems = [
    { key: 'home', label: 'Home', icon: Globe },
    { key: 'analysis', label: 'Analysis & Methodology', icon: BookOpen },
    { key: 'webgis', label: 'WebGIS Interactive Map', icon: Map },
  ];

  const handleNavigate = (view) => {
    setCurrentView(view);
    resetScroll();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-950">
      
      {/* ─── STICKY MASTER NAVBAR ─── */}
      <nav id="master-navbar" className="sticky top-0 z-50 bg-slate-950/90 [backdrop-filter:blur(8px)] text-white border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 select-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/25 group-hover:text-emerald-300 transition-colors">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-mono font-black tracking-widest text-[10px] text-emerald-400 uppercase leading-none block">
                GIS Lab 2026
              </span>
              <span className="font-bold text-slate-100 text-sm leading-tight block uppercase">
                Group 15 Turkey
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 relative select-none">
            {navItems.map((item) => {
              const active = currentView === item.key;
              const IconComp = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all relative flex items-center gap-2 cursor-pointer ${
                    active 
                      ? 'text-emerald-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: GitHub repo link */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              id="github-nav-link"
              href="https://github.com/shahzaib1638/mapping-air-quality-turkey" 
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-200 flex items-center gap-2 group transition-all"
            >
              <Github className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>GitHub Source</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-350 hover:text-white active:scale-95 transition-all outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* ─── MOBILE DRAWER OVERLAY ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-slate-950 border-b border-slate-800 absolute top-16 left-0 right-0 z-40 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const active = currentView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleNavigate(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3.5 rounded-xl font-bold text-left text-sm transition-all select-none ${
                      active 
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold' 
                        : 'text-slate-350 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <hr className="border-slate-900" />
              <a
                href="https://github.com/shahzaib1638/mapping-air-quality-turkey"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest text-slate-300 bg-slate-900/60 border border-slate-800/80"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-emerald-400" />
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DYNAMIC SUB-VIEW SCREEN ─── */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentView === 'analysis' && <AnalysisView />}
        {currentView === 'webgis' && <WebGISView />}
      </main>

      {/* ─── STRUCTURAL FOOTER ─── */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 select-none">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-slate-500">
          <div>
            <span className="font-extrabold text-slate-300 uppercase tracking-widest text-xs font-mono block">GIS Lab Group 15</span>
            <p className="text-[10px] text-slate-500 mt-1">Geographic Information Systems Project 2026</p>
          </div>
          
          <div className="flex justify-center gap-6 text-xs font-bold uppercase font-mono tracking-wider">
            <button onClick={() => handleNavigate('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">Introduction</button>
            <button onClick={() => handleNavigate('analysis')} className="hover:text-emerald-400 transition-colors cursor-pointer">Methodology</button>
            <button onClick={() => handleNavigate('webgis')} className="hover:text-emerald-400 transition-colors cursor-pointer">WebGIS Map</button>
          </div>

          <div className="md:text-right text-[10px] font-mono">
            <p className="font-extrabold text-slate-400">Course Advisor: Prof. Qiongjie Xu</p>
            <p className="text-slate-600 mt-1">TurkStat, CAMS, ESRI, WorldPop grids</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Utility to reset viewport scroll positions smoothly
function resetScroll() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}
