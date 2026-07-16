"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying float vWave;

  float hash(vec2 p){
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main(){
    vec3 p = position;
    float t = uTime;

    vec2 q = vec2(
      noise(p.xy * 0.5 + t * 0.1),
      noise(p.xy * 0.5 + vec2(5.2, 1.3) - t * 0.08)
    );
    vec2 r = vec2(
      noise(p.xy * 0.8 + q * 2.0 + t * 0.15),
      noise(p.xy * 0.8 + q * 2.0 + vec2(8.3, 2.8))
    );

    float w = noise(p.xy * 1.2 + r * 3.0) * 2.0 - 1.0;
    w += sin(p.x * 0.6 + t * 0.4) * 0.25;

    p.z += w * 0.6;
    vWave = w;
    gl_PointSize = 2.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vWave;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    float a = pow(clamp(vWave * 0.5 + 0.5, 0.0, 1.0), 2.5) * 0.85;
    if (a < 0.02) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`;

function DotField({ reducedMotion }: { reducedMotion: boolean }) {
  const invalidate = useThree((s) => s.invalidate);

  const { geometry, material } = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 110 : 260;
    const rows = isMobile ? 64 : 150;
    const aspect = window.innerWidth / window.innerHeight;
    // Compact world space so domain-warped noise forms ribbons, not per-pixel speckles
    const worldHeight = 10;
    const worldWidth = worldHeight * aspect;

    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions[i++] = (col / (cols - 1) - 0.5) * worldWidth;
        positions[i++] = (row / (rows - 1) - 0.5) * worldHeight;
        positions[i++] = 0;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useEffect(() => {
    if (reducedMotion) {
      invalidate();
    }
  }, [reducedMotion, invalidate]);

  useFrame((state) => {
    if (reducedMotion) return;
    material.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
  });

  return <points geometry={geometry} material={material} />;
}

export default function DotWave() {
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: false, alpha: true }}
      camera={{
        zoom: window.innerHeight / 10,
        position: [0, 0, 100],
        near: 0.1,
        far: 1000,
      }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <DotField reducedMotion={reducedMotion} />
    </Canvas>
  );
}
