import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 180;

const vert = /* glsl */ `
  attribute float aSeed;
  attribute float aLife;
  attribute float aSpread;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    float life = mod(uTime * 0.2 + aLife, 1.0);
    float swayX = sin(uTime * 0.5 + aSeed * 6.28) * (0.4 + life * 1.2);
    float swayZ = cos(uTime * 0.4 + aSeed * 4.0) * (0.3 + life * 0.9);

    vec3 pos = position;
    pos.x += swayX * aSpread;
    pos.y += life * 11.0;
    pos.z += swayZ * aSpread;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = (28.0 + life * 90.0) * uPixelRatio;
    gl_PointSize = size * (1.0 / -mv.z);

    float fadeIn = smoothstep(0.0, 0.18, life);
    float fadeOut = 1.0 - smoothstep(0.55, 1.0, life);
    vAlpha = fadeIn * fadeOut * 0.22;
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float soft = pow(1.0 - smoothstep(0.0, 0.5, d), 2.2);
    // Very dim warm haze that reads against the black bg
    vec3 col = vec3(0.95, 0.55, 0.30);
    gl_FragColor = vec4(col, soft * vAlpha);
  }
`;

export default function Steam() {
  const matRef = useRef();

  const { geo, uniforms } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const lives = new Float32Array(COUNT);
    const spreads = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = -7 - Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
      seeds[i] = Math.random();
      lives[i] = Math.random();
      spreads[i] = 0.7 + Math.random() * 0.9;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aLife", new THREE.BufferAttribute(lives, 1));
    g.setAttribute("aSpread", new THREE.BufferAttribute(spreads, 1));

    const u = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };
    return { geo: g, uniforms: u };
  }, []);

  useFrame((_, dt) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += dt;
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
