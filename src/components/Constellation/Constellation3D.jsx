import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";

/** Centauri Interactive — minimalist 3D constellation
 * Smooth continuous camera orbit that blends with user drag.
 */

const NODES = [
  { id: 1, p: [-1.2, -0.9, -0.25] },
  { id: 2, p: [-0.8, -0.35, 0.3] },
  { id: 5, p: [-0.35, -0.05, -0.1] },
  { id: 7, p: [-0.55, 0.1, 0.35] },
  { id: 11, p: [-0.15, 0.55, -0.2] },
  { id: 12, p: [-0.15, 0.25, 0.25] },
  { id: 3, p: [-0.25, 0.85, 0.1] },
  { id: 9, p: [0.2, 0.9, -0.3] },
  { id: 4, p: [0.4, 0.25, 0.28] },
  { id: 8, p: [0.65, 0.15, -0.22] },
  { id: 13, p: [0.85, -0.25, 0.18] },
  { id: 14, p: [0.48, 0.05, -0.26] },
  { id: 6, p: [-0.75, 0.35, 0.22] },
  { id: 10, p: [-1.05, 0.3, -0.18] },
];

const EDGES = [
  [1, 2],
  [2, 5],
  [5, 7],
  [7, 11],
  [11, 9],
  [7, 12],
  [12, 11],
  [7, 4],
  [4, 8],
  [8, 13],
  [4, 14],
  [14, 8],
  [6, 10],
  [6, 7],
  [3, 11],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

function Node({ id, position, active, setActive }) {
  const ref = useRef();
  const BASE = 0.022;
  const HOVER_SCALE = active === id ? 1.2 : 1.0;

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() * 0.001 + id;
    ref.current.scale.setScalar(HOVER_SCALE * (1 + Math.sin(t) * 0.007));
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setActive(id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setActive(null);
      }}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[BASE, 24, 24]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

function ConstellationScene() {
  const [active, setActive] = useState(null);
  const controlsRef = useRef();
  const angleRef = useRef(0); // persistent orbit angle
  const [dragging, setDragging] = useState(false);

  const lines = useMemo(() => {
    return EDGES.map(([a, b]) => {
      const pa = byId[a].p,
        pb = byId[b].p;
      return [new THREE.Vector3(...pa), new THREE.Vector3(...pb)];
    });
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useFrame(({ camera }, delta) => {
    if (prefersReduced) return;

    if (!dragging) {
      // Continuous orbit based on last known angle
      angleRef.current += delta * 0.1; // smooth speed
      const R = 4.4;
      camera.position.x = Math.sin(angleRef.current) * R;
      camera.position.z = Math.cos(angleRef.current) * R;
      camera.lookAt(0, 0.25, 0);
    } else if (controlsRef.current) {
      // While dragging, keep track of the current azimuthal angle
      angleRef.current = controlsRef.current.getAzimuthalAngle();
    }
  });

  return (
    <>
      <color attach="background" args={["white"]} />

      <group scale={1.05}>
        {lines.map((pts, i) => (
          <Line
            key={i}
            points={pts}
            color="black"
            lineWidth={1}
            transparent
            opacity={active ? 0.22 : 0.26}
          />
        ))}
        {NODES.map((n) => (
          <Node key={n.id} id={n.id} position={n.p} active={active} setActive={setActive} />
        ))}
      </group>

      {/* Controls enabled: camera orbit resumes smoothly after drag */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.28}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={[0, 0.25, 0]}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />
    </>
  );
}

export default function Constellation3D() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md select-none overflow-visible"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4.4], fov: 32 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <ConstellationScene />
      </Canvas>
    </div>
  );
}
