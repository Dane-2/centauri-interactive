export default function Essence() {
  return (
    <div className="bg-white text-black">
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-4">ESSENCE</h1>
        <p className="text-lg md:text-xl text-black/70">The fabric of who you are.</p>
      </section>

      {/* 2. Concept Section */}
      <section className="py-32 border-t border-black/10">
        <div className="max-w-2xl mx-auto text-center px-6">
          <p className="text-black/70 leading-relaxed text-lg">
            Essence is more than a digital closet. It’s an intelligent reflection of your personal
            rhythm—understanding not just what you wear, but when, and why. By learning from your
            habits, it brings intention back into the everyday act of getting dressed.
          </p>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-left">
          <div className="border border-black/10 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-2">Outfit Intelligence</h3>
            <p className="text-black/70">
              Smarter outfit pairing through on-device learning that adapts to you.
            </p>
          </div>

          <div className="border border-black/10 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-2">Wear History</h3>
            <p className="text-black/70">
              Track what you wear and when to reveal patterns in your style.
            </p>
          </div>

          <div className="border border-black/10 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-2">Forecasting</h3>
            <p className="text-black/70">
              Predict rotation and frequency to extend your wardrobe’s lifespan.
            </p>
          </div>

          <div className="border border-black/10 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-2">Minimal Design</h3>
            <p className="text-black/70">
              Built natively in SwiftUI for iOS 18 with precision and simplicity.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Showcase Section */}
      <section className="py-40 border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-[9/19.5] w-64 md:w-80 mx-auto rounded-[3rem] border border-black/10 bg-black/5" />
          <p className="mt-8 text-black/60 text-sm uppercase tracking-wider">Coming soon to iOS</p>
        </div>
      </section>

      {/* 5. Quote Section */}
      <section className="py-32 border-t border-black/10 text-center">
        <blockquote className="text-2xl md:text-3xl italic text-black/80 leading-relaxed">
          “Style is the language of presence.
          <br />
          Essence helps you speak it fluently.”
        </blockquote>
      </section>

      {/* 6. CTA Section */}
      <section className="py-20 border-t border-black/10 text-center">
        <a
          href="#"
          className="text-black text-lg underline decoration-black/20 hover:decoration-black transition-colors"
        >
          Follow the journey →
        </a>
      </section>
    </div>
  );
}
