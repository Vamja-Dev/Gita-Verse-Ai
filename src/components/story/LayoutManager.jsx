import React from 'react';
import VerseImage from './VerseImage';
import SanskritText from './SanskritText';
import { motion } from 'framer-motion';

export default function LayoutManager({ verse }) {
  const { layout, chapter, sanskrit, english, image } = verse;

  return (
    <section className="min-h-[80vh] w-full flex items-center justify-center px-6 md:px-16 py-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* LAYOUT 1: CENTER ARTWORK */}
        {layout === 'center' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 text-left">
              <SanskritText sanskrit={sanskrit} chapter={chapter} />
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <VerseImage src={image} alt={chapter} layout={layout} />
            </div>
            <div className="lg:col-span-4">
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-base md:text-lg font-sans text-amber-100/90 leading-relaxed font-light border-l-2 border-amber-500/40 pl-6 bg-amber-950/20 py-5 rounded-r-xl backdrop-blur-md shadow-lg"
              >
                {english}
              </motion.p>
            </div>
          </div>
        )}

        {/* LAYOUT 2: LEFT ARTWORK */}
        {layout === 'left' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <VerseImage src={image} alt={chapter} layout={layout} />
            </div>
            <div className="lg:col-span-6 space-y-8 text-left pl-0 lg:pl-12">
              <SanskritText sanskrit={sanskrit} chapter={chapter} />
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-base md:text-lg font-sans text-amber-100/90 leading-relaxed font-light border-l-2 border-amber-500/40 pl-6 bg-amber-950/20 py-5 rounded-r-xl backdrop-blur-md shadow-lg"
              >
                {english}
              </motion.p>
            </div>
          </div>
        )}

        {/* LAYOUT 3: RIGHT ARTWORK */}
        {layout === 'right' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8 text-left pr-0 lg:pr-12 order-2 lg:order-1">
              <SanskritText sanskrit={sanskrit} chapter={chapter} />
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-base md:text-lg font-sans text-amber-100/90 leading-relaxed font-light border-l-2 border-amber-500/40 pl-6 bg-amber-950/20 py-5 rounded-r-xl backdrop-blur-md shadow-lg"
              >
                {english}
              </motion.p>
            </div>
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <VerseImage src={image} alt={chapter} layout={layout} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}