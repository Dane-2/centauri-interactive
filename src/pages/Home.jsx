import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import squaresVideo from "../assets/squares.mp4";
// import Constellation3D from "../components/Constellation/Constellation3D.jsx"; // Kept for future use

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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
      duration: 0.6,
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

const textRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="space-y-24 md:space-y-32 overflow-hidden relative min-h-screen bg-transparent">
      {/* Full Screen Video Background */}
      <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={squaresVideo} type="video/mp4" />
        </video>
      </div>

      {/* HERO */}
      <motion.section
        ref={heroRef}
        aria-labelledby="home-hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-[90vh] flex flex-col justify-center relative py-20 -mt-32"
        style={{ opacity, scale, y }}
      >
        
        <motion.div
          variants={containerVariants}
          className="max-w-5xl mx-auto px-6 w-full relative z-10 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]"
              style={{
                transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
              }}
            >
              <motion.span
                variants={textRevealVariants}
                className="block mb-2"
              >
                Intelligence in design.
              </motion.span>
              <motion.span
                variants={textRevealVariants}
                className="block"
              >
                Precision in execution.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto"
            >
              We craft digital experiences that feel effortless, timeless, and perfectly aligned
              with your vision.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2 justify-center"
            >
              <Link
                to="/about"
                className="group relative inline-flex h-14 items-center justify-center rounded-full border border-black bg-black px-10 text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                </span>
              </Link>
              <Link
                to="/apps"
                className="inline-flex h-14 items-center justify-center rounded-full border border-black/20 bg-white px-10 text-black text-sm font-medium transition-all duration-300 hover:border-black hover:bg-black hover:text-white hover:scale-105"
              >
                View Work
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

      {/* VALUE STRIP */}
      <motion.section
        aria-labelledby="value-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto px-6 relative z-10"
      >
        <h2 id="value-strip" className="sr-only">
          What we focus on
        </h2>

        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="group relative rounded-3xl border border-black/10 bg-white/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="text-4xl font-light text-black mb-4">Precision</div>
            <p className="text-black/70 leading-relaxed text-lg">
              Clean architecture and disciplined UI so everything feels intentional. Every pixel
              serves a purpose.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="group relative rounded-3xl border border-black/10 bg-white/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="text-4xl font-light text-black mb-4">Performance</div>
            <p className="text-black/70 leading-relaxed text-lg">
              Fast loads, smooth interactions, and Core Web Vitals in the green. Speed is a feature.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="group relative rounded-3xl border border-black/10 bg-white/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="text-4xl font-light text-black mb-4">Delivery</div>
            <p className="text-black/70 leading-relaxed text-lg">
              Simple scopes, clear timelines, and builds that ship quickly. No surprises, just
              results.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* FEATURED WORK PREVIEW */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 md:py-40 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-light mb-6">Featured Work</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Explore our latest creations and see how we bring ideas to life.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={cardVariants} whileHover="hover">
              <Link
                to="/apps/outfitted"
                className="group block relative rounded-3xl border border-black/10 bg-white/50 backdrop-blur-sm p-12 transition-all duration-300 hover:border-black/20 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-sm font-medium text-black/60 mb-4">iOS App</div>
                  <h3 className="text-3xl md:text-4xl font-light mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    Outfitted
                  </h3>
                  <p className="text-lg text-black/70 leading-relaxed mb-6">
                    Your intelligent wardrobe companion. Style, simplified.
                  </p>
                  <div className="flex items-center gap-2 text-black/60 group-hover:text-black transition-colors">
                    <span className="text-sm">View Project</span>
                    <motion.span
                      className="text-xl"
                      initial={{ x: 0 }}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={cardVariants} className="relative">
              <div className="rounded-3xl border border-black/5 bg-white/30 backdrop-blur-sm p-12 opacity-60">
                <div className="text-sm font-medium text-black/50 mb-4">Coming Soon</div>
                <h3 className="text-3xl md:text-4xl font-light mb-4">More Projects</h3>
                <p className="text-lg text-black/50 leading-relaxed">
                  We're constantly building new tools and experiences. Stay tuned.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-light mb-8">
          Ready to build something{" "}
          <span className="italic text-black/80">worth remembering?</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/about"
            className="inline-flex h-14 items-center justify-center rounded-full border border-black bg-black px-10 text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Get Started →
          </Link>
          <Link
            to="/apps"
            className="inline-flex h-14 items-center justify-center rounded-full border border-black/20 bg-white px-10 text-black text-sm font-medium transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            View Our Work
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
