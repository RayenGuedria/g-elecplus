import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, Component, ReactNode } from "react";
import * as THREE from "three";
import { Zap, Car, Leaf, Thermometer, Sun, Wrench, Factory } from "lucide-react";

export type SceneKind = "electrical" | "charger" | "energy" | "heatpump" | "solar" | "plumbing" | "maintenance";

type Mat = { color: string; emissive: string };

const metal = ({ color, emissive }: Mat, extra: Partial<{ roughness: number; metalness: number; emissiveIntensity: number }> = {}) => (
  <meshStandardMaterial
    color={color}
    emissive={emissive}
    emissiveIntensity={extra.emissiveIntensity ?? 0.35}
    roughness={extra.roughness ?? 0.25}
    metalness={extra.metalness ?? 0.85}
  />
);

/* === Service-specific 3D models === */

const Electrical = (m: Mat) => {
  // Stylized lightning bolt built from offset boxes
  return (
    <group>
      <mesh position={[0.15, 0.6, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.35, 1, 0.18]} />
        {metal(m, { emissiveIntensity: 0.9 })}
      </mesh>
      <mesh position={[-0.15, -0.05, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.45, 0.9, 0.18]} />
        {metal(m, { emissiveIntensity: 0.9 })}
      </mesh>
      <mesh position={[0.15, -0.7, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.3, 0.8, 0.18]} />
        {metal(m, { emissiveIntensity: 0.9 })}
      </mesh>
      {/* Surrounding ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        {metal(m, { emissiveIntensity: 1.2, metalness: 0.2 })}
      </mesh>
    </group>
  );
};

const Charger = (m: Mat) => {
  // EV charging station: body + screen + plug
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 2, 0.7]} />
        {metal(m, { roughness: 0.3, emissiveIntensity: 0.2 })}
      </mesh>
      <mesh position={[0, 0.55, 0.36]}>
        <boxGeometry args={[0.75, 0.55, 0.02]} />
        <meshStandardMaterial color="#0b1320" emissive={m.emissive} emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, -0.2, 0.4]}>
        <cylinderGeometry args={[0.18, 0.18, 0.4, 32]} />
        {metal(m, { emissiveIntensity: 0.6 })}
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[1.3, 0.15, 0.85]} />
        {metal(m, { metalness: 0.6 })}
      </mesh>
    </group>
  );
};

const Energy = (m: Mat) => {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <MeshDistortMaterial color={m.color} emissive={m.emissive} emissiveIntensity={0.7} distort={0.35} speed={2} roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.025, 16, 100]} />
        {metal(m, { emissiveIntensity: 1, metalness: 0.2 })}
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        {metal(m, { emissiveIntensity: 0.8, metalness: 0.2 })}
      </mesh>
    </group>
  );
};

const HeatPump = (m: Mat) => {
  const fan = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (fan.current) fan.current.rotation.z = clock.getElapsedTime() * 2; });
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.8, 1.4, 1]} />
        {metal(m, { roughness: 0.35, emissiveIntensity: 0.15 })}
      </mesh>
      <mesh position={[0, 0, 0.51]}>
        <torusGeometry args={[0.55, 0.06, 16, 64]} />
        {metal(m, { emissiveIntensity: 0.8 })}
      </mesh>
      <group ref={fan} position={[0, 0, 0.55]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
            <boxGeometry args={[0.5, 0.12, 0.04]} />
            {metal(m, { emissiveIntensity: 0.5, metalness: 0.6 })}
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 24]} />
          {metal(m, { emissiveIntensity: 0.6 })}
        </mesh>
      </group>
    </group>
  );
};

const Solar = (m: Mat) => {
  // Tilted solar panel with grid of cells
  const cells: JSX.Element[] = [];
  const cols = 4, rows = 3;
  const w = 0.38, h = 0.38, gap = 0.05;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c - (cols - 1) / 2) * (w + gap);
      const y = (r - (rows - 1) / 2) * (h + gap);
      cells.push(
        <mesh key={`${r}-${c}`} position={[x, y, 0.03]}>
          <boxGeometry args={[w, h, 0.02]} />
          <meshStandardMaterial color="#0a2540" emissive={m.emissive} emissiveIntensity={0.4} roughness={0.2} metalness={0.6} />
        </mesh>
      );
    }
  }
  return (
    <group rotation={[-0.45, 0.4, 0]}>
      <mesh>
        <boxGeometry args={[(w + gap) * cols + 0.1, (h + gap) * rows + 0.1, 0.05]} />
        {metal(m, { metalness: 0.9, roughness: 0.3, emissiveIntensity: 0.2 })}
      </mesh>
      {cells}
      {/* Stand */}
      <mesh position={[0, -0.9, -0.3]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 16]} />
        {metal(m, { metalness: 0.7 })}
      </mesh>
    </group>
  );
};

const Plumbing = (m: Mat) => {
  // Connected pipes
  return (
    <group>
      <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 1, 32]} />
        {metal(m, { metalness: 0.95, roughness: 0.15 })}
      </mesh>
      <mesh position={[-0.4, 0.4, 0]}>
        <torusGeometry args={[0.4, 0.22, 24, 48, Math.PI / 2]} />
        {metal(m, { metalness: 0.95, roughness: 0.15 })}
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.7, 32]} />
        {metal(m, { metalness: 0.95, roughness: 0.15 })}
      </mesh>
      <mesh position={[0.4, 0.4, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.4, 0.22, 24, 48, Math.PI / 2]} />
        {metal(m, { metalness: 0.95, roughness: 0.15 })}
      </mesh>
      <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 1, 32]} />
        {metal(m, { metalness: 0.95, roughness: 0.15 })}
      </mesh>
      {/* Valve */}
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.34, 0.06, 16, 48]} />
        {metal(m, { emissiveIntensity: 0.8, metalness: 0.4 })}
      </mesh>
    </group>
  );
};

const Gear = (m: Mat) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.6; });
  const teeth = 10;
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 0.3, 48]} />
        {metal(m, { metalness: 0.8, roughness: 0.25 })}
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        {metal(m, { emissiveIntensity: 0.8 })}
      </mesh>
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.05, Math.sin(a) * 1.05, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.3, 0.25, 0.3]} />
            {metal(m, { metalness: 0.8 })}
          </mesh>
        );
      })}
    </group>
  );
};

const Model = ({ kind, m }: { kind: SceneKind; m: Mat }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.35 + mouse.x * 0.4;
    ref.current.rotation.x = mouse.y * 0.25;
  });
  const inner = (() => {
    switch (kind) {
      case "electrical": return <Electrical {...m} />;
      case "charger": return <Charger {...m} />;
      case "energy": return <Energy {...m} />;
      case "heatpump": return <HeatPump {...m} />;
      case "solar": return <Solar {...m} />;
      case "plumbing": return <Plumbing {...m} />;
      case "maintenance": return <Gear {...m} />;
    }
  })();
  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={1.1}>
      <group ref={ref}>{inner}</group>
    </Float>
  );
};

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch() {}
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

interface Props {
  kind: SceneKind;
  color: string;
  emissive: string;
  light: string;
}

const iconFor = (kind: SceneKind) => {
  switch (kind) {
    case "electrical": return Zap;
    case "charger": return Car;
    case "energy": return Leaf;
    case "heatpump": return Thermometer;
    case "solar": return Sun;
    case "plumbing": return Wrench;
    case "maintenance": return Factory;
  }
};

const ServiceScene = ({ kind, color, emissive, light }: Props) => {
  const [webgl, setWebgl] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) setWebgl(false);
    } catch { setWebgl(false); }
  }, []);

  const Icon = iconFor(kind);
  const fallback = (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-50 animate-glow-pulse"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />
      <div
        className="relative w-44 h-44 md:w-60 md:h-60 rounded-[2rem] rotate-6 animate-float flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}, ${light})`,
          boxShadow: `0 30px 80px -10px ${color}80, inset 0 1px 0 rgba(255,255,255,0.3)`,
        }}
      >
        <Icon className="w-20 h-20 md:w-28 md:h-28 text-white -rotate-6" strokeWidth={1.5} />
      </div>
    </div>
  );

  if (!webgl) return fallback;

  return (
    <SceneBoundary fallback={fallback}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color={light} />
          <pointLight position={[-5, -3, 2]} intensity={1.5} color={emissive} />
          <Model kind={kind} m={{ color, emissive }} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
};

export default ServiceScene;