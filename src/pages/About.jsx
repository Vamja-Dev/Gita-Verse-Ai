import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Compass, Cpu } from 'lucide-react';
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaDiscord, FaXTwitter } from "react-icons/fa6";
import aboutBg from '../assets/images/about-bg.png';

export default function About({ onNavigate }) {
  // Social links configuration with direct login URLs and brand icons
  const socialLinks = [
    { name: 'YouTube', icon: <FaYoutube className="text-red-500 text-lg" />, url: 'https://www.youtube.com/login' },
    { name: 'Instagram', icon: <FaInstagram className="text-pink-500 text-lg" />, url: 'https://www.instagram.com/accounts/login/?hl=en' },
    { name: 'Facebook', icon: <FaFacebook className="text-blue-500 text-lg" />, url: 'https://www.facebook.com/login/' },
    { name: 'X (Twitter)', icon: <FaXTwitter className="text-slate-100 text-lg" />, url: 'https://x.com/i/flow/login' },
    { name: 'LinkedIn', icon: <FaLinkedin className="text-blue-400 text-lg" />, url: 'https://www.linkedin.com/login' },
    { name: 'Discord', icon: <FaDiscord className="text-indigo-400 text-lg" />, url: 'https://discord.com/login' },
  ];

  return (
    <main 
      className="relative w-full min-h-screen text-slate-100 font-serif px-6 md:px-16 pt-24 pb-24 overflow-x-hidden flex flex-col items-center"
      style={{
        backgroundColor: '#06040a',
        backgroundImage: `linear-gradient(rgba(6, 4, 10, 0.75), rgba(6, 4, 10, 0.85)), url(${aboutBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-20 w-full max-w-4xl mx-auto space-y-12">
        
        {/* Header Title Section */}
        <div className="text-center space-y-4 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-sans tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Our Sacred Mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide [text-shadow:_0_0_30px_rgba(245,158,11,0.5)]">
            About GitaVerse AI
          </h1>
          <p className="text-sm md:text-base font-sans text-slate-300/80 font-light max-w-2xl mx-auto leading-relaxed">
            A divine sanctuary bridging ancient Vedic scriptures with state-of-the-art interactive intelligence.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#0d0914]/85 backdrop-blur-md border border-amber-500/30 rounded-3xl p-8 md:p-12 space-y-10 shadow-2xl">
          
          {/* Vision Section */}
          <div className="space-y-3">
            <h3 className="text-2xl font-serif text-amber-200 flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-amber-400" />
              Our Sacred Vision
            </h3>
            <p className="text-sm md:text-base font-sans text-slate-300/90 leading-relaxed font-light">
              GitaVerse AI was created with a profound purpose: to make the eternal wisdom of the Bhagavad Gita, the Four Vedas, and ancient cosmic timelines accessible, engaging, and deeply personal for seekers across the modern world. We believe that spiritual clarity, inner duty (Dharma), and peace are timeless necessities.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-amber-200 flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-amber-400" />
              Platform Architecture & Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <li className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 px-4 py-3 rounded-2xl text-xs md:text-sm font-sans text-slate-200">
                <span className="text-amber-400">✦</span> 701+ Interactive Shloka Verses
              </li>
              <li className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 px-4 py-3 rounded-2xl text-xs md:text-sm font-sans text-slate-200">
                <span className="text-amber-400">✦</span> Personalized User Bookmarks
              </li>
              <li className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 px-4 py-3 rounded-2xl text-xs md:text-sm font-sans text-slate-200">
                <span className="text-amber-400">✦</span> Four Vedas & Yuga Chronicles
              </li>
              <li className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 px-4 py-3 rounded-2xl text-xs md:text-sm font-sans text-slate-200">
                <span className="text-amber-400">✦</span> Immersive Meditation Audio
              </li>
            </ul>
          </div>

          {/* Social Media Connection Section */}
          <div className="space-y-4 pt-4 border-t border-amber-500/20">
            <h3 className="text-xl font-serif text-amber-200 flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-amber-400" />
              Connect With Our Community
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#06040a]/70 border border-amber-500/30 text-amber-100 hover:text-amber-400 font-sans text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
                >
                  {social.icon}
                  <span className="font-bold">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-20 text-center py-6 text-xs text-amber-200/40 font-sans tracking-widest uppercase bg-slate-950/80 backdrop-blur-md border-t border-amber-500/10 w-full mt-24">
        © 2026 GitaVerse AI. All rights reserved.
      </footer>
    </main>
  );
}