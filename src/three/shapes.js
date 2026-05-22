import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

/**
 * Sample N points on the surface of a geometry, returning a flat Float32Array.
 */
function sample(geometry, count) {
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial()
  );
  const sampler = new MeshSurfaceSampler(mesh).build();
  const out = new Float32Array(count * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(v);
    out[i * 3 + 0] = v.x;
    out[i * 3 + 1] = v.y;
    out[i * 3 + 2] = v.z;
  }
  return out;
}

/**
 * Merge multiple meshes (with transforms) into a single geometry.
 */
function merge(parts) {
  // Use a single geometry with grouped attributes by baking transforms into vertices.
  const geoms = parts.map(({ geo, position = [0,0,0], rotation = [0,0,0], scale = [1,1,1] }) => {
    const g = geo.clone();
    const m = new THREE.Matrix4();
    m.compose(
      new THREE.Vector3(...position),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
      new THREE.Vector3(...scale)
    );
    g.applyMatrix4(m);
    return g;
  });
  // Manually merge positions (skip indices to keep it simple — sampler ignores them anyway with non-indexed).
  const nonIndexed = geoms.map((g) => g.index ? g.toNonIndexed() : g);
  let total = 0;
  nonIndexed.forEach((g) => { total += g.attributes.position.count; });
  const merged = new THREE.BufferGeometry();
  const positions = new Float32Array(total * 3);
  let offset = 0;
  nonIndexed.forEach((g) => {
    positions.set(g.attributes.position.array, offset);
    offset += g.attributes.position.array.length;
  });
  merged.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return merged;
}

/* -------- Three composite geometries, each ~ unit-radius -------- */

export function buildBurgerGeometry() {
  const parts = [
    // top bun (half sphere)
    { geo: new THREE.SphereGeometry(1.1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2), position: [0, 0.55, 0] },
    // sesame seeds (tiny spheres)
    ...Array.from({ length: 30 }).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.4);
      const r = 1.12;
      return {
        geo: new THREE.SphereGeometry(0.04, 8, 8),
        position: [Math.sin(phi) * Math.cos(theta) * r, 0.55 + Math.cos(phi) * r, Math.sin(phi) * Math.sin(theta) * r],
      };
    }),
    // cheese slice
    { geo: new THREE.BoxGeometry(2.2, 0.08, 2.2), position: [0, 0.35, 0], rotation: [0, 0.15, 0] },
    // patty
    { geo: new THREE.CylinderGeometry(1.05, 1.0, 0.32, 40), position: [0, 0.15, 0] },
    // second cheese
    { geo: new THREE.BoxGeometry(2.2, 0.08, 2.2), position: [0, -0.05, 0], rotation: [0, -0.1, 0] },
    // second patty
    { geo: new THREE.CylinderGeometry(1.05, 1.0, 0.32, 40), position: [0, -0.25, 0] },
    // lettuce ring
    { geo: new THREE.TorusGeometry(1.05, 0.1, 16, 60), position: [0, -0.45, 0], rotation: [Math.PI / 2, 0, 0] },
    // bottom bun
    { geo: new THREE.CylinderGeometry(1.1, 0.95, 0.45, 40), position: [0, -0.7, 0] },
  ];
  return merge(parts);
}

export function buildFriesGeometry() {
  const parts = [];
  // cone container
  parts.push({ geo: new THREE.CylinderGeometry(0.9, 0.45, 1.4, 24, 1, true), position: [0, -0.55, 0] });
  // fries (boxes)
  for (let i = 0; i < 22; i++) {
    const x = (Math.random() - 0.5) * 1.2;
    const z = (Math.random() - 0.5) * 1.2;
    const len = 1.4 + Math.random() * 0.6;
    parts.push({
      geo: new THREE.BoxGeometry(0.12, len, 0.12),
      position: [x, 0.2 + Math.random() * 0.3, z],
      rotation: [(Math.random() - 0.5) * 0.4, Math.random() * 0.5, (Math.random() - 0.5) * 0.4],
    });
  }
  return merge(parts);
}

export function buildTacosGeometry() {
  const parts = [];
  // outer wrap (half cylinder rolled — using a torus partial or just a cylinder cut)
  // Approach: cylinder with open ends rotated to look like a rolled wrap.
  const wrap = new THREE.CylinderGeometry(0.9, 0.9, 2.2, 40, 1, true, -Math.PI / 2.4, Math.PI * 1.5);
  parts.push({ geo: wrap, rotation: [0, 0, Math.PI / 2], position: [0, 0, 0] });

  // Filling clusters (small spheres / boxes inside)
  for (let i = 0; i < 24; i++) {
    parts.push({
      geo: new THREE.SphereGeometry(0.09 + Math.random() * 0.06, 8, 8),
      position: [(Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.7],
    });
  }
  // a couple of "lettuce" bits
  for (let i = 0; i < 12; i++) {
    parts.push({
      geo: new THREE.BoxGeometry(0.06, 0.4, 0.06),
      position: [(Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.6],
      rotation: [(Math.random() - 0.5) * 1, Math.random(), (Math.random() - 0.5) * 1],
    });
  }
  return merge(parts);
}

/**
 * Build the three target position buffers for N particles.
 * Each buffer is sampled from the corresponding composite geometry.
 */
export function buildMorphTargets(count) {
  const burger = buildBurgerGeometry();
  const fries = buildFriesGeometry();
  const tacos = buildTacosGeometry();

  return {
    burger: sample(burger, count),
    fries: sample(fries, count),
    tacos: sample(tacos, count),
  };
}
