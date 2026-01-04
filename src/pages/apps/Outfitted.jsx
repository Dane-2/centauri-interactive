import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const features = [
  {
    title: "Outfit Intelligence",
    description: "Smarter outfit pairing through on-device learning that adapts to your style and preferences.",
    icon: "🧠",
  },
  {
    title: "Wear History",
    description: "Track what you wear and when to reveal patterns in your personal style evolution.",
    icon: "📊",
  },
  {
    title: "Smart Forecasting",
    description: "Predict rotation and frequency to extend your wardrobe's lifespan and reduce waste.",
    icon: "🔮",
  },
  {
    title: "Minimal Design",
    description: "Built natively in SwiftUI for iOS 18 with precision, simplicity, and attention to detail.",
    icon: "✨",
  },
];

export default function Outfitted() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-white text-black overflow-hidden">
      {/* 1. Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
        style={{ opacity, scale, y }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-radial from-black/5 via-transparent to-transparent" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-black/5 blur-3xl"
          animate={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-black/5 blur-3xl"
          animate={{
            x: -mousePosition.x * 0.3,
            y: -mousePosition.y * 0.3,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />

        <motion.div
          variants={itemVariants}
          className="relative z-10 space-y-8 max-w-6xl mx-auto"
          style={{
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full border border-black/20 bg-white/50 backdrop-blur-sm text-sm font-medium text-black/70">
              iOS App
            </span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl lg:text-[14rem] font-light tracking-tight mb-8 leading-none">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block"
            >
              OUTFITTED
            </motion.span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl text-black/70 max-w-3xl mx-auto leading-relaxed"
          >
            Your intelligent wardrobe companion.{" "}
            <span className="text-black font-medium">Style, simplified.</span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-14 items-center justify-center rounded-full border border-black bg-black px-10 text-white text-sm font-medium transition-all duration-300 hover:shadow-2xl"
            >
              Coming Soon
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-14 items-center justify-center rounded-full border border-black/20 bg-white px-10 text-black text-sm font-medium transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              Learn More ↓
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-black/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 rounded-full bg-black/40"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 2. Concept Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-32 md:py-48 border-t border-black/10 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-light mb-12"
          >
            More than a digital closet
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-black/70 leading-relaxed text-xl md:text-2xl space-y-6"
          >
            <span className="block mb-4">
              Outfitted is an intelligent reflection of your personal rhythm—understanding not just
              what you wear, but <span className="text-black font-medium">when</span>, and{" "}
              <span className="text-black font-medium">why</span>.
            </span>
            <span className="block">
              By learning from your habits, it brings intention back into the everyday act of
              getting dressed. Every outfit becomes a choice, not a chore.
            </span>
          </motion.p>
        </div>
      </motion.section>

      {/* 3. Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 md:py-40 border-t border-black/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-light text-center mb-20"
          >
            Built for intention
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group relative border border-black/10 rounded-3xl p-12 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-3xl font-medium mb-4">{feature.title}</h3>
                  <p className="text-black/70 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Showcase Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-40 md:py-64 border-t border-black/10 text-center relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />

        <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 8, rotateX: 2 }}
            transition={{ duration: 0.4 }}
            className="relative inline-block"
            style={{ perspective: "1000px" }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent rounded-[3rem] blur-3xl -z-10" />
            
            {/* Phone mockup */}
            <div className="relative aspect-[9/19.5] w-72 md:w-96 mx-auto rounded-[3rem] border-2 border-black/20 bg-gradient-to-br from-black/10 via-black/5 to-black/10 shadow-2xl overflow-hidden">
              {/* Screen content simulation */}
              <div className="absolute inset-4 rounded-[2.5rem] bg-white overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Status bar */}
                  <div className="h-12 bg-black/5 flex items-center justify-between px-6 text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-black/40" />
                      <div className="w-1 h-1 rounded-full bg-black/40" />
                      <div className="w-1 h-1 rounded-full bg-black/40" />
                    </div>
                  </div>
                  {/* App content */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="h-8 bg-black/10 rounded-lg w-3/4" />
                    <div className="space-y-3">
                      <div className="h-24 bg-black/5 rounded-xl" />
                      <div className="h-24 bg-black/5 rounded-xl" />
                      <div className="h-24 bg-black/5 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 space-y-4"
          >
            <p className="text-black/60 text-sm uppercase tracking-wider font-medium">
              Coming soon to iOS
            </p>
            <p className="text-black/50 text-sm">
              Built with SwiftUI • iOS 18+ • Privacy-first
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 5. Quote Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 md:py-48 border-t border-black/10 text-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        <motion.blockquote
          variants={itemVariants}
          className="text-4xl md:text-6xl italic text-black/80 leading-relaxed max-w-5xl mx-auto px-6 relative z-10"
        >
          "Style is the language of presence.
          <br />
          <span className="text-black font-medium">Outfitted helps you speak it fluently.</span>"
        </motion.blockquote>
      </motion.section>

      {/* 6. CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 md:py-40 border-t border-black/10 text-center"
      >
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-5xl font-light">
            Ready to transform your wardrobe?
          </h2>
          <p className="text-xl text-black/60">
            Join the waitlist to be notified when Outfitted launches.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-14 items-center justify-center rounded-full border border-black bg-black px-10 text-white text-sm font-medium transition-all duration-300 hover:shadow-2xl"
            >
              Join Waitlist →
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-black text-lg font-medium underline decoration-black/20 hover:decoration-black transition-all"
            >
              Follow the journey
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}


