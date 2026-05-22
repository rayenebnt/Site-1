import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Smoothstep clamped to [0,1].
 */
const smooth = (a, b, t) => {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

/**
 * Cinematic burger model that explodes vertically as the user scrolls.
 * Each ingredient is a separate mesh receiving its own scroll-driven
 * displacement, rotation, and lateral drift.
 */
export default function BurgerScene({ scrollRef, mouseRef }) {
  const group = useRef();
  const refs = {
    bunTop: useRef(),
    sesames: useRef(),
    cheese1: useRef(),
    patty1: useRef(),
    cheese2: useRef(),
    patty2: useRef(),
    lettuce: useRef(),
    tomato: useRef(),
    bunBot: useRef(),
  };

  // Pre-compute sesame positions distributed over the dome of the top bun.
  const sesameData = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.6);
      const r = 1.16;
      return {
        pos: [
          Math.sin(phi) * Math.cos(theta) * r,
          Math.cos(phi) * r * 0.6,
          Math.sin(phi) * Math.sin(theta) * r,
        ],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      };
    });
  }, []);

  // Per-piece explode metadata: base Y, vertical displacement at full
  // explode, rotation per axis, and small lateral drift for life.
  const layers = useMemo(
    () => [
      { ref: refs.bunTop,  base:  0.60, dy:  2.6, rx:  0.12, ry:  0.5, dx:  0.20, dz: -0.10 },
      { ref: refs.sesames, base:  0.60, dy:  2.6, rx:  0.12, ry:  0.5, dx:  0.20, dz: -0.10 },
      { ref: refs.cheese1, base:  0.35, dy:  1.55, rx: -0.10, ry: -0.4, dx: -0.18, dz:  0.10 },
      { ref: refs.patty1,  base:  0.15, dy:  0.95, rx:  0.08, ry:  0.3, dx:  0.12, dz:  0.15 },
      { ref: refs.cheese2, base: -0.05, dy:  0.30, rx:  0.05, ry:  0.25, dx:  0.05, dz: -0.12 },
      { ref: refs.patty2,  base: -0.25, dy: -0.45, rx: -0.08, ry: -0.3, dx: -0.15, dz: -0.08 },
      { ref: refs.lettuce, base: -0.45, dy: -1.05, rx:  0.15, ry:  0.5, dx:  0.18, dz:  0.10 },
      { ref: refs.tomato,  base: -0.55, dy: -1.55, rx: -0.12, ry: -0.45, dx: -0.10, dz:  0.18 },
      { ref: refs.bunBot,  base: -0.75, dy: -2.30, rx:  0.05, ry:  0.3, dx:  0.06, dz: -0.10 },
    ],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const p = scrollRef.current ?? 0;

    const intro = smooth(0, 0.12, p);
    const explode = smooth(0.15, 0.7, p);
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;

    if (group.current) {
      group.current.rotation.y = t * 0.18 + mx * 0.35;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.05 + my * 0.18 - p * 0.25;
      group.current.position.y = -1.4 + intro * 0.4 - p * 0.6;
      group.current.scale.setScalar(0.7 + intro * 0.5);
    }

    layers.forEach((L) => {
      const m = L.ref.current;
      if (!m) return;
      // Per-piece independent rotation phase (only when exploding)
      const phase = t * 0.6 + L.base * 5.0;
      m.position.x = L.dx * explode + Math.sin(phase) * 0.05 * explode;
      m.position.y = L.base + L.dy * explode + Math.sin(phase * 0.8) * 0.08 * explode;
      m.position.z = L.dz * explode + Math.cos(phase) * 0.05 * explode;
      m.rotation.x = L.rx * explode + Math.sin(phase * 0.7) * 0.12 * explode;
      m.rotation.y = L.ry * explode + t * 0.25 * explode;
      m.rotation.z = Math.sin(phase * 0.5) * 0.08 * explode;
    });
  });

  // Materials
  const bunMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d28848", roughness: 0.78, metalness: 0.05 }),
    []
  );
  const bunBotMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b87838", roughness: 0.85, metalness: 0.05 }),
    []
  );
  const sesameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#fff1c8", roughness: 0.45 }),
    []
  );
  const cheeseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f59e1f",
        roughness: 0.4,
        emissive: "#5a2a08",
        emissiveIntensity: 0.18,
      }),
    []
  );
  const pattyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#4a1c0e", roughness: 0.96 }),
    []
  );
  const lettuceMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5fa83f", roughness: 0.78 }),
    []
  );
  const tomatoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d83f24",
        roughness: 0.55,
        emissive: "#3a0808",
        emissiveIntensity: 0.12,
      }),
    []
  );

  return (
    <group ref={group} frustumCulled={false}>
      {/* Top bun (dome) */}
      <mesh ref={refs.bunTop} material={bunMat}>
        <sphereGeometry args={[1.15, 64, 36, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* Sesame seeds — share the bun's transform via shared ref group */}
      <group ref={refs.sesames}>
        {sesameData.map((s, i) => (
          <mesh key={i} position={s.pos} rotation={s.rot} material={sesameMat}>
            <icosahedronGeometry args={[0.045, 0]} />
          </mesh>
        ))}
      </group>

      {/* Cheese 1 */}
      <mesh ref={refs.cheese1} rotation={[0, 0.18, 0]} material={cheeseMat}>
        <boxGeometry args={[2.25, 0.08, 2.25]} />
      </mesh>

      {/* Patty 1 */}
      <mesh ref={refs.patty1} material={pattyMat}>
        <cylinderGeometry args={[1.08, 1.0, 0.32, 48]} />
      </mesh>

      {/* Cheese 2 */}
      <mesh ref={refs.cheese2} rotation={[0, -0.12, 0]} material={cheeseMat}>
        <boxGeometry args={[2.25, 0.08, 2.25]} />
      </mesh>

      {/* Patty 2 */}
      <mesh ref={refs.patty2} material={pattyMat}>
        <cylinderGeometry args={[1.08, 1.0, 0.32, 48]} />
      </mesh>

      {/* Lettuce ring */}
      <mesh ref={refs.lettuce} rotation={[Math.PI / 2, 0, 0]} material={lettuceMat}>
        <torusGeometry args={[1.1, 0.13, 18, 80]} />
      </mesh>

      {/* Tomato slice */}
      <mesh ref={refs.tomato} material={tomatoMat}>
        <cylinderGeometry args={[1.0, 1.0, 0.09, 48]} />
      </mesh>

      {/* Bottom bun */}
      <mesh ref={refs.bunBot} material={bunBotMat}>
        <cylinderGeometry args={[1.15, 0.95, 0.45, 48]} />
      </mesh>
    </group>
  );
}
