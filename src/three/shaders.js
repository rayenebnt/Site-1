// GLSL — particle morphing shader.
// Two-step morph: posA -> posB -> posC driven by uMorph in [0,2].

export const vertexShader = /* glsl */ `
  attribute vec3 aPosA;
  attribute vec3 aPosB;
  attribute vec3 aPosC;
  attribute float aRandom;
  attribute float aScale;

  uniform float uTime;
  uniform float uMorph;       // 0..2
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3  uMouse;
  uniform float uDispersion;  // 0..1 — extra noise scatter (peaks between morph stages)

  varying float vRandom;
  varying float vDepth;

  // Hash + noise
  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }
  vec3 hash3(vec3 p) {
    return vec3(hash(p), hash(p + 1.7), hash(p + 3.4));
  }

  void main() {
    // Pick the two targets and the local t for the current morph segment.
    // Sharpened ease — particles snap into the next shape quickly.
    vec3 target;
    float seg = clamp(uMorph, 0.0, 2.0);
    float local = seg <= 1.0 ? seg : seg - 1.0;
    // Snappy ease-in-out: faster middle, settles quickly
    float t = local * local * (3.0 - 2.0 * local);
    t = t * t * (3.0 - 2.0 * t);
    if (seg <= 1.0) {
      target = mix(aPosA, aPosB, t);
    } else {
      target = mix(aPosB, aPosC, t);
    }

    // Time-based wobble per particle
    float n = hash(vec3(aRandom * 13.1, uTime * 0.4, aRandom * 7.7));
    vec3 wobble = (hash3(vec3(aRandom * 3.1, uTime * 0.3, aRandom * 5.5)) - 0.5) * 0.04;

    // Dispersion during morph transitions (peaks when uMorph is at a half step)
    float morphFrac = fract(uMorph);
    float burst = sin(morphFrac * 3.14159) * uDispersion;
    vec3 scatter = (hash3(vec3(aRandom * 9.1, aRandom * 2.3, aRandom * 4.4)) - 0.5);
    target += scatter * burst * 1.4;

    // Mouse repel
    vec3 toMouse = target - uMouse;
    float d = length(toMouse);
    float repel = smoothstep(2.0, 0.0, d) * 0.4;
    target += normalize(toMouse + 0.0001) * repel;

    vec3 pos = target + wobble;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Point size — depth-corrected
    float size = uSize * aScale * (1.0 + burst * 1.2);
    gl_PointSize = size * uPixelRatio * (1.0 / -mvPosition.z);

    vRandom = aRandom;
    vDepth = -mvPosition.z;
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;

  varying float vRandom;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // soft circular point with glow center
    float core = smoothstep(0.5, 0.0, d);
    float glow = smoothstep(0.5, 0.15, d);

    // Color per-particle blends across the palette over time
    float t = fract(vRandom + uTime * 0.05);
    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.5, t));
    col = mix(col, uColorC, smoothstep(0.5, 1.0, t));

    // Distance fade
    float fade = clamp(1.2 - vDepth / 24.0, 0.0, 1.0);

    // On a light bg we want crisp dark dots, not bloom — keep colors as-is.
    vec3 finalCol = col;
    float alpha = core * fade * 0.85;

    gl_FragColor = vec4(finalCol, alpha);
  }
`;
