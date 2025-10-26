import { Link } from "react-router-dom";

export default function Apps() {
  return (
    <div className="max-w-5xl mx-auto py-24 text-center space-y-12">
      <h1 className="text-5xl font-light">Our Apps</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Example app card for Essence */}
        <Link
          to="/apps/essence"
          className="group block border border-black/10 rounded-2xl p-10 hover:bg-black/5 transition"
        >
          <h2 className="text-2xl font-medium group-hover:underline">Essence</h2>
          <p className="mt-3 text-black/70">
            The fabric of who you are — your AI-powered wardrobe companion.
          </p>
        </Link>

        {/* Placeholder for future apps */}
        <div className="border border-black/5 rounded-2xl p-10 opacity-50">
          <h2 className="text-2xl font-medium">Coming Soon</h2>
          <p className="mt-3 text-black/50">More Centauri creations in development.</p>
        </div>
      </div>
    </div>
  );
}
