import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Apps() {
  return (
    <div className="max-w-7xl mx-auto py-24 md:py-32 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-20"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight">Our Apps</h1>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Intelligent tools and experiences crafted with precision and purpose.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {/* Outfitted Card */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Link
              to="/apps/outfitted"
              className="group relative block border border-black/10 rounded-3xl p-12 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl md:text-4xl font-light group-hover:translate-x-2 transition-transform duration-300">
                    Outfitted
                  </h2>
                  <motion.span
                    className="text-2xl"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
                <p className="text-lg text-black/70 leading-relaxed mb-4">
                  Your intelligent wardrobe companion. Style, simplified.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-medium text-black/70">
                    iOS
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-medium text-black/70">
                    AI
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-medium text-black/70">
                    SwiftUI
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Coming Soon Card */}
          <motion.div variants={cardVariants} className="relative">
            <div className="border border-black/5 rounded-3xl p-12 bg-white/30 backdrop-blur-sm opacity-60">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-light">Coming Soon</h2>
                <p className="text-lg text-black/50 leading-relaxed">
                  More Centauri creations in development. We're building tools that matter.
                </p>
                <div className="flex gap-2 mt-6">
                  <div className="h-2 w-2 rounded-full bg-black/20 animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-black/20 animate-pulse delay-75" />
                  <div className="h-2 w-2 rounded-full bg-black/20 animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
