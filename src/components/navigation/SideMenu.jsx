import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Logo from './Logo';
import UserProfile from './UserProfile';
import NavigationItem from './NavigationItem';
import ExploreAccordion from './ExploreAccordion';
import MenuFooter from './MenuFooter';
import { primaryMenuItems } from '../../data/menuItems';
import '../../styles/navigation.css';

export default function SideMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 z-50 w-full sm:w-[420px] h-screen glass-panel flex flex-col p-6 md:p-8 overflow-y-auto scrollbar-none"
        >
          {/* Top Header inside Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-amber-600/20 mb-6">
            <Logo />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-[#2c1810] border border-amber-600/40 text-amber-300 flex items-center justify-center shadow-lg"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* User Profile Box */}
          <UserProfile onClose={onClose} />

          {/* Vertical Menu Navigation Items */}
          <div className="flex flex-col gap-2 flex-1">
            {primaryMenuItems.map((item) => {
              if (item.isAccordion) {
                return <ExploreAccordion key={item.name} onClose={onClose} />;
              }
              return <NavigationItem key={item.name} item={item} onClose={onClose} />;
            })}
          </div>

          {/* Footer */}
          <MenuFooter />
        </motion.div>
      )}
    </AnimatePresence>
  );
}