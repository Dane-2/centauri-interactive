import DaneImg from "../assets/Twins.png";
import AustinImg from "../assets/Twins2.png";

export default function About() {
  return (
    <div className="bg-white text-black">
      {/* 1. Hero / Mission */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Who We Are</h1>
        <p className="max-w-2xl text-lg text-black/70 leading-relaxed">
          Centauri Interactive is a digital design and development studio focused on clarity, speed,
          and precision. We create modern websites and intelligent tools for startups, students, and
          brands ready to evolve.
        </p>
      </section>

      {/* 2. Philosophy */}
      <section className="py-32 border-t border-black/10">
        <div className="max-w-3xl mx-auto text-center px-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-medium">Our Philosophy</h2>
          <p className="text-black/70 text-lg leading-relaxed">
            We believe design should be invisible — letting ideas speak for themselves. Every pixel,
            every line of code, and every motion serves a purpose: to make digital experiences feel
            effortless and timeless.
          </p>
          <p className="text-black/70 text-lg leading-relaxed">
            Whether you’re building a brand from scratch or refining something established, our goal
            is simple — to make your presence look and feel as intentional as the work you do.
          </p>
        </div>
      </section>

      {/* 3. Process */}
      <section className="py-32 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-16">How We Work</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="border border-black/10 rounded-2xl p-8">
              <h3 className="text-xl font-medium mb-3">1. Discovery</h3>
              <p className="text-black/70">
                We learn who you are, your goals, and what problems your site or product needs to
                solve. The foundation starts with clarity.
              </p>
            </div>
            <div className="border border-black/10 rounded-2xl p-8">
              <h3 className="text-xl font-medium mb-3">2. Design & Build</h3>
              <p className="text-black/70">
                Using modern frameworks and thoughtful UX, we create interfaces that load fast, feel
                intuitive, and scale easily.
              </p>
            </div>
            <div className="border border-black/10 rounded-2xl p-8">
              <h3 className="text-xl font-medium mb-3">3. Launch & Support</h3>
              <p className="text-black/70">
                From deployment to post-launch tweaks, we stay with you to ensure every detail
                continues to perform beautifully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team */}
      <section className="py-40 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          <h2 className="text-2xl md:text-3xl font-medium text-center">The Team</h2>

          {/* Dane */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Dane Persek</h3>
              <p className="text-black/70 leading-relaxed text-lg">
                Builder, designer, and creative technologist. I lead Centauri’s digital systems,
                architecture, and AI-driven projects — translating ambitious ideas into refined,
                functional products.
              </p>
            </div>
            <div>
              <img
                src={DaneImg}
                alt="Dane Persek"
                className="w-full rounded-2xl border border-black/10 object-cover object-top max-h-[600px]"
              />
            </div>
          </div>

          {/* Austin */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="space-y-4 order-2 md:order-1">
              <h3 className="text-2xl font-medium">Austin Persek</h3>
              <p className="text-black/70 leading-relaxed text-lg">
                Creative strategist and operations lead. I help clients shape their ideas into
                market-ready identities — ensuring every project stays sharp, consistent, and true
                to its purpose.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={AustinImg}
                alt="Austin Persek"
                className="w-full rounded-2xl border border-black/10 object-cover object-top max-h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-32 border-t border-black/10 text-center">
        <h2 className="text-3xl font-light mb-8">Let’s build something worth remembering.</h2>
        <a
          href="/apps"
          className="inline-flex h-12 items-center justify-center rounded-full border border-black bg-black px-8 text-white text-sm font-medium transition hover:opacity-90"
        >
          Work With Us
        </a>
      </section>
    </div>
  );
}
