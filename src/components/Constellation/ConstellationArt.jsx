import { useEffect, useRef, useState } from "react";

/**
 * Minimal interactive constellation (decorative only).
 * - Black lines on white, subtle parallax to pointer.
 * - Hover: brighten nearby star + its connected lines.
 * - Respects prefers-reduced-motion (parallax disabled).
 */
export default function ConstellationArt() {
  const wrapperRef = useRef(null);
  const [hoverId, setHoverId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Constellation nodes (normalized -1..1 for x/y)
  const nodes = [
    { id: "home", x: -0.25, y: 0.05, r: 5 }, // main star
    { id: "apps", x: 0.4, y: -0.08, r: 4 },
    { id: "about", x: 0.32, y: 0.28, r: 4 },
    { id: "guideA", x: -0.55, y: -0.18, r: 3 },
    { id: "guideB", x: 0.55, y: 0.06, r: 3 },
  ];

  // Edges between nodes (by id)
  const edges = [
    ["home", "apps"],
    ["home", "about"],
    ["apps", "about"],
    ["home", "guideA"],
    ["apps", "guideB"],
  ];

  // Parallax (disabled if reduced motion)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return;

    let raf = 0;
    const lerp = (a, b, t) => a + (b - a) * t;
    let target = { x: 0, y: 0 };
    let state = { x: 0, y: 0 };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width; // 0..1
      const my = (e.clientY - rect.top) / rect.height; // 0..1
      target.x = (mx - 0.5) * 2; // -1..1
      target.y = (my - 0.5) * 2; // -1..1
      if (!raf) tick();
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!raf) tick();
    };

    const tick = () => {
      state.x = lerp(state.x, target.x, 0.07);
      state.y = lerp(state.y, target.y, 0.07);
      setOffset({ x: state.x, y: state.y });
      if (Math.abs(state.x - target.x) > 0.001 || Math.abs(state.y - target.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Helper: map normalized to viewBox coords
  const size = 520; // square viewBox
  const cx = size / 2;
  const cy = size / 2;
  const scale = size * 0.38;

  const getXY = (n, depth = 1) => {
    // depth scales parallax (foreground reacts more)
    const px = n.x + offset.x * 0.05 * depth;
    const py = n.y + offset.y * 0.05 * depth;
    return [cx + px * scale, cy + py * scale];
  };

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto aspect-square w-full max-w-md select-none"
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        {/* faint radial wash for depth */}
        <defs>
          <radialGradient id="wash" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.06)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={size * 0.45} fill="url(#wash)" />

        {/* crosshair (very light) */}
        <line
          x1={cx}
          y1={cy - size * 0.45}
          x2={cx}
          y2={cy + size * 0.45}
          stroke="rgba(0,0,0,0.08)"
        />
        <line
          x1={cx - size * 0.45}
          y1={cy}
          x2={cx + size * 0.45}
          y2={cy}
          stroke="rgba(0,0,0,0.08)"
        />

        {/* edges */}
        {edges.map(([a, b], i) => {
          const n1 = byId[a],
            n2 = byId[b];
          const [x1, y1] = getXY(n1, 1.2);
          const [x2, y2] = getXY(n2, 1.0);
          const active = hoverId && (hoverId === a || hoverId === b);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={active ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.20)"}
              strokeWidth="1"
            />
          );
        })}

        {/* nodes (stars) */}
        {nodes.map((n) => {
          const [x, y] = getXY(n, 1.3);
          const active = hoverId === n.id;
          return (
            <g
              key={n.id}
              onMouseEnter={() => setHoverId(n.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: "default" }}
            >
              <circle cx={x} cy={y} r={n.r + (active ? 1.5 : 0)} fill="black" />
              {/* optional tiny label on hover for main nodes */}
              {active && ["home", "apps", "about"].includes(n.id) && (
                <text x={x + 10} y={y - 8} fontSize="12" fill="black" opacity="0.7">
                  {n.id.charAt(0).toUpperCase() + n.id.slice(1)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
