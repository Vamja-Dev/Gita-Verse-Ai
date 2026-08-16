import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

export default function FloatingChatButton() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        onClick={() => navigate("/gita-chat")}
        whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(251, 191, 36, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-semibold shadow-[0_4px_25px_rgba(0,0,0,0.5)] border border-amber-200/40 backdrop-blur-md cursor-pointer group transition-all duration-300"
      >
        <HiSparkles className="text-xl text-black group-hover:rotate-12 transition-transform duration-300" />
        <span className="tracking-widest uppercase text-sm font-bold">Gita Chat</span>
      </motion.button>
    </motion.div>
  );
}