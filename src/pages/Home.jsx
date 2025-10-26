import Constellation3D from "../components/Constellation/Constellation3D.jsx";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section
        aria-labelledby="home-hero"
        className="min-h-[80vh] grid items-center gap-10 md:grid-cols-2"
      >
        {/* Left: headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
            Intelligence in design. <br className="hidden md:block" /> Precision in execution.
          </h1>
        </div>

        {/* Right: constellation (decorative only) */}
        <Constellation3D />
      </section>

      {/* VALUE STRIP */}
      <section aria-labelledby="value-strip" className="grid gap-6 md:grid-cols-3">
        <h2 id="value-strip" className="sr-only">
          What we focus on
        </h2>

        <div className="rounded-2xl border border-black/10 p-6">
          <div className="text-sm font-medium text-black">Precision</div>
          <p className="mt-2 text-sm text-black/70">
            Clean architecture and disciplined UI so everything feels intentional.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 p-6">
          <div className="text-sm font-medium text-black">Performance</div>
          <p className="mt-2 text-sm text-black/70">
            Fast loads, smooth interactions, and Core Web Vitals in the green.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 p-6">
          <div className="text-sm font-medium text-black">Delivery</div>
          <p className="mt-2 text-sm text-black/70">
            Simple scopes, clear timelines, and builds that ship quickly.
          </p>
        </div>
      </section>
    </div>
  );
}
