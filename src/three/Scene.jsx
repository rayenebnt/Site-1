import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import BurgerScene from "./BurgerScene.jsx";
import Steam from "./Steam.jsx";

/**
 * Fixed 3D background. Owns the shared scroll progress (0..1) and
 * mouse vector, passes them into the burger + steam children.
 */
export default function Scene() {
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = Math.max(0, Math.min(1, window.scrollY / Math.max(1, max)));
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
        camera={{ position: [0, 0.4, 6], fov: 42, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#f6ecdc"), 1);
        }}
      >
        {/* Warm three-point lighting tuned for a cream background */}
        <ambientLight intensity={0.55} color="#fff1d8" />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#fff3dc" />
        <pointLight position={[-5, 3, 4]} intensity={1.6} color="#ffae5e" distance={22} />
        <pointLight position={[3, -2, 4]} intensity={0.9} color="#ff6a2e" distance={16} />
        <pointLight position={[0, 4, -4]} intensity={0.5} color="#ffd28a" distance={20} />

        <BurgerScene scrollRef={scrollRef} mouseRef={mouseRef} />
        <Steam />
      </Canvas>
    </div>
  );
}
