import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import ParticleMorph from "./ParticleMorph.jsx";
import * as THREE from "three";

/**
 * Fixed 3D background canvas. Owns the scroll-driven morph value and
 * shared mouse vector, then passes refs into the particle system.
 */
export default function Scene() {
  const morphRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, max)));
      // Map scroll to morph 0..2 with a slightly compressed range so each shape lingers.
      morphRef.current = p * 2;
    };
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#f6ecdc"), 1);
        }}
      >
        {/* No lights needed — shader material */}
        <ParticleMorph morphRef={morphRef} mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
