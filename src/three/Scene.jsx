import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import BurgerScene from "./BurgerScene.jsx";
import Steam from "./Steam.jsx";

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
        camera={{ position: [0, 1.6, 7], fov: 42, near: 0.1, far: 100 }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color("#070707"), 1);
          camera.lookAt(0, 0, 0);
        }}
      >
        {/* Blueprint floor grid */}
        <Grid
          position={[0, -3, 0]}
          args={[40, 40]}
          cellSize={0.6}
          cellThickness={0.7}
          cellColor="#1a1a1a"
          sectionSize={3}
          sectionThickness={1.2}
          sectionColor="#ff5b2e"
          fadeDistance={22}
          fadeStrength={1.4}
          infiniteGrid
        />

        <BurgerScene scrollRef={scrollRef} mouseRef={mouseRef} />
        <Steam />
      </Canvas>
    </div>
  );
}
