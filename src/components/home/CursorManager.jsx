import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorManager() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 850, damping: 45, mass: 0.1 }}
    >
      {/* Divine Spark Core */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-100 shadow-[0_0_20px_4px_rgba(252,211,77,0.8)] flex items-center justify-center animate-pulse">
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_2px_white]" />
      </div>
      {/* Expanding Golden Ring */}
      <div className="absolute w-14 h-14 rounded-full border border-amber-300/50 animate-ping opacity-75 pointer-events-none" />
    </motion.div>
  );
}