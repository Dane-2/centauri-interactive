import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";

/** Centauri Interactive — Twin Stars Orbiting
 * Two stars orbiting around their common center of mass (barycenter)
 * Smooth continuous camera orbit that blends with user drag.
 */

// Create a procedural star texture (fallback if no image provided)
function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Create radial gradient for star glow
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
  gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.95)");
  gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.7)");
  gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Add bright center core
  const centerGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 30);
  centerGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
  centerGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.8)");
  centerGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = centerGradient;
  ctx.fillRect(0, 0, 512, 512);

  // Add some texture variation
  for (let i = 0; i < 20; i++) {
    const x = 256 + (Math.random() - 0.5) * 100;
    const y = 256 + (Math.random() - 0.5) * 100;
    const r = Math.random() * 10 + 5;
    const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    spotGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
    spotGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = spotGradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  return new THREE.CanvasTexture(canvas);
}

function TwinStar({ 
  id, 
  orbitRadius, 
  orbitSpeed, 
  phaseOffset, 
  size, 
  active, 
  setActive,
  sharedTimeRef,
  starImagePath = null // Optional: path to star image
}) {
  const starRef = useRef();
  const glowRef = useRef();
  const groupRef = useRef();
  const HOVER_SCALE = active === id ? 1.4 : 1.0;

  // Use image texture if provided, otherwise use procedural texture
  const starTexture = starImagePath 
    ? useTexture(starImagePath)
    : useMemo(() => createStarTexture(), []);
  
  // Configure texture if using image
  if (starImagePath && starTexture) {
    starTexture.wrapS = THREE.RepeatWrapping;
    starTexture.wrapT = THREE.RepeatWrapping;
    starTexture.minFilter = THREE.LinearFilter;
    starTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state, delta) => {
    if (!groupRef.current || !sharedTimeRef) return;
    
    // Use shared time reference for synchronization
    const time = sharedTimeRef.current * orbitSpeed;
    
    // Orbital motion in a plane (circular orbit)
    const x = Math.cos(time + phaseOffset) * orbitRadius;
    const y = Math.sin(time + phaseOffset) * orbitRadius;
    const z = 0; // Keep them in the same plane
    
    groupRef.current.position.set(x, y, z);
    
    // Subtle pulsing animation
    const t = performance.now() * 0.001;
    const pulse = 1 + Math.sin(t * 2 + id) * 0.05;
    
    if (starRef.current) {
      starRef.current.scale.setScalar(HOVER_SCALE * size * pulse);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(HOVER_SCALE * size * pulse * 1.8);
      glowRef.current.material.opacity = 0.2 + Math.sin(t * 3 + id) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="black" 
          opacity={0.2} 
          transparent 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main star with texture */}
      <mesh
        ref={starRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setActive(id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setActive(null);
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          map={starTexture}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Bright center core - solid black center */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial 
          color="black" 
          opacity={1}
        />
      </mesh>
      
      {/* Additional inner glow layer */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color="black" 
          opacity={0.4}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function ConnectionLine({ orbitRadius, orbitSpeed, sharedTimeRef, active }) {
  const lineRef = useRef();
  const geometryRef = useRef(new THREE.BufferGeometry());
  
  useFrame(() => {
    if (!lineRef.current || !sharedTimeRef) return;
    
    const time = sharedTimeRef.current * orbitSpeed;
    
    // Calculate star positions (same as in TwinStar)
    const pos1 = [
      Math.cos(time) * orbitRadius,
      Math.sin(time) * orbitRadius,
      0,
    ];
    const pos2 = [
      Math.cos(time + Math.PI) * orbitRadius,
      Math.sin(time + Math.PI) * orbitRadius,
      0,
    ];
    
    geometryRef.current.setFromPoints([
      new THREE.Vector3(...pos1),
      new THREE.Vector3(...pos2),
    ]);
    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef} geometry={geometryRef.current}>
      <lineBasicMaterial 
        color="black" 
        opacity={active ? 0.3 : 0.2} 
        transparent 
        linewidth={2}
      />
    </line>
  );
}

function ConstellationScene() {
  const [active, setActive] = useState(null);
  const controlsRef = useRef();
  const angleRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  
  // Shared time reference for synchronizing stars and connection line
  const sharedTimeRef = useRef(0);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Orbit parameters
  const ORBIT_RADIUS = 0.6; // Distance from center
  const ORBIT_SPEED = 0.3; // Speed of orbit
  const STAR_SIZE_1 = 0.04;
  const STAR_SIZE_2 = 0.04;

  useFrame(({ camera }, delta) => {
    if (prefersReduced) return;

    // Update shared time for star synchronization
    sharedTimeRef.current += delta;

    if (!dragging) {
      // Continuous orbit based on last known angle
      angleRef.current += delta * 0.1; // smooth speed
      const R = 4.4;
      camera.position.x = Math.sin(angleRef.current) * R;
      camera.position.z = Math.cos(angleRef.current) * R;
      camera.lookAt(0, 0, 0);
    } else if (controlsRef.current) {
      // While dragging, keep track of the current azimuthal angle
      angleRef.current = controlsRef.current.getAzimuthalAngle();
    }
  });

  return (
    <>
      <color attach="background" args={["white"]} />

      <group scale={1.2}>
        {/* Connection line between stars */}
        <ConnectionLine 
          orbitRadius={ORBIT_RADIUS}
          orbitSpeed={ORBIT_SPEED}
          sharedTimeRef={sharedTimeRef}
          active={active !== null}
        />
        
        {/* Twin stars orbiting each other */}
        <TwinStar
          id={1}
          orbitRadius={ORBIT_RADIUS}
          orbitSpeed={ORBIT_SPEED}
          phaseOffset={0}
          size={STAR_SIZE_1}
          active={active === 1}
          setActive={setActive}
          sharedTimeRef={sharedTimeRef}
          // starImagePath="/path/to/star-image.png" // Uncomment and add path to use custom image
        />
        <TwinStar
          id={2}
          orbitRadius={ORBIT_RADIUS}
          orbitSpeed={ORBIT_SPEED}
          phaseOffset={Math.PI} // Opposite phase (180 degrees)
          size={STAR_SIZE_2}
          active={active === 2}
          setActive={setActive}
          sharedTimeRef={sharedTimeRef}
          // starImagePath="/path/to/star-image.png" // Uncomment and add path to use custom image
        />
      </group>

      {/* Controls enabled: camera orbit resumes smoothly after drag */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.28}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={[0, 0, 0]}
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
