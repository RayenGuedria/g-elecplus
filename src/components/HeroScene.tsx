import { useEffect, useMemo, useRef } from "react";

type ParticleSeed = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  strong: boolean;
  phase: number;
  speed: number;
  jitter: number;
};

const PARTICLE_COUNT = 180;
const CLEAR_ZONE_X = 0.24;
const CLEAR_ZONE_Y = 0.19;
const INFLUENCE_RADIUS = 200;
const PUSH_DISTANCE = 52;

const createSeed = (): ParticleSeed => {
  let x = Math.random();
  let y = Math.random();
  while (Math.abs(x - 0.5) < CLEAR_ZONE_X && Math.abs(y - 0.5) < CLEAR_ZONE_Y) {
    x = Math.random();
    y = Math.random();
  }
  return {
    x,
    y,
    size: 2 + Math.random() * 4,
    alpha: 0.4 + Math.random() * 0.45,
    strong: Math.random() > 0.5,
    phase: Math.random() * Math.PI * 2,
    speed: 0.2 + Math.random() * 0.5,
    jitter: 2 + Math.random() * 5,
  };
};

const HeroScene = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boltRef = useRef<SVGPathElement>(null);
  const boltGroupRef = useRef<SVGGElement>(null);
  const seeds = useMemo(() => Array.from({ length: PARTICLE_COUNT }, createSeed), []);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>();
  const boltTimerRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    seeds.forEach((seed, i) => {
      const node = particleRefs.current[i];
      if (!node) return;
      node.style.width = `${seed.size}px`;
      node.style.height = `${seed.size}px`;
    });

    const start = performance.now();
    let lastTs = start;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const dt = now - lastTs;
      lastTs = now;
      const rect = wrapper.getBoundingClientRect();
      const pointer = pointerRef.current;

      const nearest: { d: number; x: number; y: number }[] = [];

      seeds.forEach((seed, index) => {
        const node = particleRefs.current[index];
        if (!node) return;

        const baseX = seed.x * rect.width;
        const baseY = seed.y * rect.height;

        // Idle electric jitter
        const jx = Math.sin(t * seed.speed + seed.phase) * seed.jitter;
        const jy = Math.cos(t * seed.speed * 1.3 + seed.phase * 1.7) * seed.jitter;

        let x = baseX + jx;
        let y = baseY + jy;
        let scale = 1;
        const flicker = 0.75 + Math.abs(Math.sin(t * 2.5 + seed.phase * 3)) * 0.25;
        let opacity = seed.alpha * flicker;

        if (pointer) {
          const dx = baseX - pointer.x;
          const dy = baseY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < INFLUENCE_RADIUS) {
            const force = (1 - distance / INFLUENCE_RADIUS) ** 2;
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * PUSH_DISTANCE * force;
            y += Math.sin(angle) * PUSH_DISTANCE * force;
            scale = 1 + force * 2.2;
            opacity = Math.min(opacity + force * 0.7, 1);
            nearest.push({ d: distance, x, y });
          }
        }

        node.style.opacity = `${opacity}`;
        node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      });

      // Lightning bolt between two nearby particles
      boltTimerRef.current -= dt;
      let bolt: { ax: number; ay: number; bx: number; by: number } | null = null;
      if (pointer && nearest.length >= 2 && boltTimerRef.current <= 0) {
        nearest.sort((a, b) => a.d - b.d);
        const a = nearest[0];
        const b = nearest[1 + Math.floor(Math.random() * Math.min(3, nearest.length - 1))];
        bolt = { ax: a.x, ay: a.y, bx: b.x, by: b.y };
        boltTimerRef.current = 140 + Math.random() * 240;
      }

      if (boltRef.current && boltGroupRef.current) {
        if (bolt) {
          const segments = 6;
          let d = `M ${bolt.ax} ${bolt.ay}`;
          for (let s = 1; s < segments; s++) {
            const p = s / segments;
            const mx = bolt.ax + (bolt.bx - bolt.ax) * p + (Math.random() - 0.5) * 20;
            const my = bolt.ay + (bolt.by - bolt.ay) * p + (Math.random() - 0.5) * 20;
            d += ` L ${mx} ${my}`;
          }
          d += ` L ${bolt.bx} ${bolt.by}`;
          boltRef.current.setAttribute("d", d);
          boltGroupRef.current.style.opacity = "1";
        } else {
          const cur = parseFloat(boltGroupRef.current.style.opacity || "0");
          boltGroupRef.current.style.opacity = `${Math.max(0, cur - 0.2)}`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };
    const handlePointerLeave = () => {
      pointerRef.current = null;
    };

    wrapper.addEventListener("pointermove", handlePointerMove);
    wrapper.addEventListener("pointerleave", handlePointerLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [seeds]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-auto">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <g ref={boltGroupRef} style={{ opacity: 0, transition: "opacity 80ms linear" }}>
          <path
            ref={boltRef}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.9))" }}
          />
        </g>
      </svg>

      {seeds.map((seed, index) => (
        <div
          key={index}
          ref={(node) => {
            particleRefs.current[index] = node;
          }}
          className="absolute rounded-full will-change-transform"
          style={{
            background: seed.strong ? "hsl(var(--primary))" : "hsl(var(--accent))",
            boxShadow: seed.strong
              ? "0 0 8px hsl(var(--primary) / 0.9), 0 0 16px hsl(var(--primary) / 0.4)"
              : "0 0 8px hsl(var(--accent) / 0.8), 0 0 14px hsl(var(--accent) / 0.3)",
          }}
        />
      ))}
    </div>
  );
};

export default HeroScene;