import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildMorphTargets } from "./shapes.js";
import { vertexShader, fragmentShader } from "./shaders.js";

const COUNT = 14000;

/**
 * Particle cloud that morphs between burger / fries / tacos
 * based on a `morph` value (0..2) driven by scroll progress.
 */
export default function ParticleMorph({ morphRef, mouseRef }) {
  const points = useRef();
  const matRef = useRef();
  const { viewport, size, gl } = useThree();

  // Build target positions once
  const { geometry, uniforms } = useMemo(() => {
    const targets = buildMorphTargets(COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(targets.burger.slice(), 3));
    geo.setAttribute("aPosA", new THREE.BufferAttribute(targets.burger, 3));
    geo.setAttribute("aPosB", new THREE.BufferAttribute(targets.fries, 3));
    geo.setAttribute("aPosC", new THREE.BufferAttribute(targets.tacos, 3));

    const randoms = new Float32Array(COUNT);
    const scales = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      randoms[i] = Math.random();
      scales[i] = 0.5 + Math.random() * 1.4;
    }
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const uni = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uSize: { value: 22 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uDispersion: { value: 1.0 },
      uColorA: { value: new THREE.Color("#ff5b2e") },
      uColorB: { value: new THREE.Color("#f4b860") },
      uColorC: { value: new THREE.Color("#ffd28a") },
    };

    return { geometry: geo, uniforms: uni };
  }, []);

  // Update pixel ratio on resize
  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }
  }, [size]);

  useFrame((state, dt) => {
    if (!matRef.current || !points.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;

    // Smoothly ease morph toward scroll target
    const target = morphRef.current ?? 0;
    u.uMorph.value += (target - u.uMorph.value) * Math.min(1, dt * 3.5);

    // Mouse — project NDC into world plane z=0
    if (mouseRef.current) {
      const m = mouseRef.current;
      const v = new THREE.Vector3(m.x, m.y, 0.5).unproject(state.camera);
      const dir = v.sub(state.camera.position).normalize();
      const dist = -state.camera.position.z / dir.z;
      const world = state.camera.position.clone().add(dir.multiplyScalar(dist));
      u.uMouse.value.copy(world);
    }

    // Gentle group rotation
    points.current.rotation.y += dt * 0.06;
  });

  return (
    <points ref={points} frustumCulled={false} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
