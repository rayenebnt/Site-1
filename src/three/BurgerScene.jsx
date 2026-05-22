import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const smooth = (a, b, t) => {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

/**
 * Low-poly wireframe burger — technical / blueprint feel.
 * Each layer is a separate mesh that explodes vertically with scroll.
 */
export default function BurgerScene({ scrollRef, mouseRef }) {
  const group = useRef();
  const refs = {
    bunTop:  useRef(),
    cheese1: useRef(),
    patty1:  useRef(),
    cheese2: useRef(),
    patty2:  useRef(),
    lettuce: useRef(),
    tomato:  useRef(),
    bunBot:  useRef(),
  };

  const layers = useMemo(
    () => [
      { ref: refs.bunTop,  base:  0.60, dy:  2.7, ry:  0.5,  dx:  0.18, dz: -0.10 },
      { ref: refs.cheese1, base:  0.35, dy:  1.55, ry: -0.4, dx: -0.18, dz:  0.10 },
      { ref: refs.patty1,  base:  0.15, dy:  0.95, ry:  0.3, dx:  0.12, dz:  0.15 },
      { ref: refs.cheese2, base: -0.05, dy:  0.30, ry:  0.25, dx:  0.05, dz: -0.12 },
      { ref: refs.patty2,  base: -0.25, dy: -0.45, ry: -0.3, dx: -0.15, dz: -0.08 },
      { ref: refs.lettuce, base: -0.45, dy: -1.10, ry:  0.5, dx:  0.18, dz:  0.10 },
      { ref: refs.tomato,  base: -0.55, dy: -1.60, ry: -0.45, dx: -0.10, dz:  0.18 },
      { ref: refs.bunBot,  base: -0.75, dy: -2.35, ry:  0.3, dx:  0.06, dz: -0.10 },
    ],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollRef.current ?? 0;
    const intro = smooth(0, 0.12, p);
    const explode = smooth(0.15, 0.7, p);
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;

    if (group.current) {
      group.current.rotation.y = t * 0.16 + mx * 0.35;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.04 + my * 0.16 - p * 0.18;
      group.current.position.y = -1.0 + intro * 0.35 - p * 0.5;
      group.current.scale.setScalar(0.85 + intro * 0.35);
    }

    layers.forEach((L) => {
      const m = L.ref.current;
      if (!m) return;
      const phase = t * 0.5 + L.base * 5.0;
      m.position.x = L.dx * explode + Math.sin(phase) * 0.04 * explode;
      m.position.y = L.base + L.dy * explode + Math.sin(phase * 0.8) * 0.06 * explode;
      m.position.z = L.dz * explode + Math.cos(phase) * 0.04 * explode;
      m.rotation.y = L.ry * explode + t * 0.2 * explode;
      m.rotation.x = Math.sin(phase * 0.7) * 0.1 * explode;
    });
  });

  // Single shared wireframe material — flame orange for ingredients,
  // white for cheese highlights.
  const wireFlame = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#ff5b2e", wireframe: true, transparent: true, opacity: 0.9 }),
    []
  );
  const wireInk = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#fafafa", wireframe: true, transparent: true, opacity: 0.55 }),
    []
  );
  const wireDim = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#fafafa", wireframe: true, transparent: true, opacity: 0.3 }),
    []
  );

  return (
    <group ref={group} frustumCulled={false}>
      <mesh ref={refs.bunTop} material={wireFlame}>
        <sphereGeometry args={[1.15, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh ref={refs.cheese1} rotation={[0, 0.18, 0]} material={wireInk}>
        <boxGeometry args={[2.25, 0.08, 2.25]} />
      </mesh>
      <mesh ref={refs.patty1} material={wireDim}>
        <cylinderGeometry args={[1.08, 1.0, 0.32, 18]} />
      </mesh>
      <mesh ref={refs.cheese2} rotation={[0, -0.12, 0]} material={wireInk}>
        <boxGeometry args={[2.25, 0.08, 2.25]} />
      </mesh>
      <mesh ref={refs.patty2} material={wireDim}>
        <cylinderGeometry args={[1.08, 1.0, 0.32, 18]} />
      </mesh>
      <mesh ref={refs.lettuce} rotation={[Math.PI / 2, 0, 0]} material={wireInk}>
        <torusGeometry args={[1.1, 0.13, 10, 32]} />
      </mesh>
      <mesh ref={refs.tomato} material={wireFlame}>
        <cylinderGeometry args={[1.0, 1.0, 0.09, 18]} />
      </mesh>
      <mesh ref={refs.bunBot} material={wireFlame}>
        <cylinderGeometry args={[1.15, 0.95, 0.45, 18]} />
      </mesh>
    </group>
  );
}
