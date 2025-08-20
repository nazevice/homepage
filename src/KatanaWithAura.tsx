import React, { useMemo } from 'react';

interface KatanaWithAuraProps {
  className?: string;
  style?: React.CSSProperties;
}

interface ParticleProps {
  spawnX: number;
  spawnY: number;
  width: number;
  height: number;
  isLargeParticle: boolean;
  lifespan: number;
  driftX: number;
  driftY: number;
  curveIntensity: number;
  flickerSpeed: number;
  initialScale: number;
  peakScale: number;
  finalScale: number;
  waveFrequency: number;
}

const PARTICLE_COUNT = 40;
const CENTER_X = 256;
const CENTER_Y = 400;
const MIN_RADIUS = 100;
const SPAWN_RADIUS_VARIANCE = 30;

const AURA_DISTANCE_MIN = 160;
const AURA_DISTANCE_MAX = 280;
const AURA_LIFESPAN_MIN = 10;
const AURA_LIFESPAN_MAX = 16;
const UPWARD_BIAS_MIN = 8;
const UPWARD_BIAS_MAX = 16;

const createParticle = (): ParticleProps => {
  const spawnRadius = MIN_RADIUS + Math.random() * SPAWN_RADIUS_VARIANCE;
  const angle = Math.random() * Math.PI * 2;
  const spawnX = CENTER_X + Math.cos(angle) * spawnRadius;
  const spawnY = CENTER_Y + Math.sin(angle) * spawnRadius;

  const dirX = spawnX - CENTER_X;
  const dirY = spawnY - CENTER_Y;
  const len = Math.max(Math.hypot(dirX, dirY), 1);
  const nx = dirX / len;
  const ny = dirY / len;

  const baseDistance = AURA_DISTANCE_MIN + Math.random() * (AURA_DISTANCE_MAX - AURA_DISTANCE_MIN);
  const upwardBias = UPWARD_BIAS_MIN + Math.random() * (UPWARD_BIAS_MAX - UPWARD_BIAS_MIN);
  let driftX = nx * baseDistance;
  let driftY = ny * baseDistance - upwardBias;
  const projection = driftX * nx + driftY * ny;
  if (projection <= 0) {
    driftX = nx * baseDistance;
    driftY = ny * baseDistance;
  }

  const lifespan = AURA_LIFESPAN_MIN + Math.random() * (AURA_LIFESPAN_MAX - AURA_LIFESPAN_MIN);
  const isLargeParticle = Math.random() > 0.7;
  const baseSize = isLargeParticle ? 3 + Math.random() * 4 : 1 + Math.random() * 2;
  const shapeVariation = 0.7 + Math.random() * 0.6;
  const width = baseSize * shapeVariation;
  const height = baseSize * (0.8 + Math.random() * 0.4);

  const flickerSpeed = 1.5 + Math.random() * 1.5;
  const curveIntensity = 8 + Math.random() * 12;
  const waveFrequency = 0.5 + Math.random() * 1.0;

  return {
    spawnX,
    spawnY,
    width,
    height,
    isLargeParticle,
    lifespan,
    driftX,
    driftY,
    curveIntensity,
    flickerSpeed,
    waveFrequency,
    initialScale: 0.3 + Math.random() * 0.4,
    peakScale: 1 + Math.random() * 0.5,
    finalScale: 0.1 + Math.random() * 0.2,
  };
};

const Particle: React.FC<{ particle: ParticleProps }> = React.memo(({ particle }) => {
  const {
    spawnX, spawnY, width, height, isLargeParticle, lifespan,
    driftX, driftY, curveIntensity, flickerSpeed, waveFrequency,
    initialScale, peakScale, finalScale
  } = particle;

  const style: React.CSSProperties & { [key: `--${string}`]: string | number } = {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    background: `radial-gradient(circle, #ff4500 0%, #dc2626 40%, #660000 100%)`,
    borderRadius: `${50 + Math.random() * 30}%`,
    left: `${spawnX}px`,
    top: `${spawnY}px`,
    boxShadow: `
      0 0 ${width * 2}px #ff4500,
      0 0 ${width * 4}px rgba(255, 69, 0, 0.8),
      0 0 ${width * 8}px rgba(220, 38, 38, 0.6),
      0 0 ${width * 12}px rgba(102, 0, 0, 0.4)
    `,
    filter: `blur(${isLargeParticle ? '2px' : '0.8px'})`,
    animationDelay: `${Math.random() * 2}s`,
    '--animation-lifespan': `${lifespan}s`,
    '--drift-x': `${driftX}px`,
    '--drift-y': `${driftY}px`,
    '--curve-intensity': `${curveIntensity}px`,
    '--flicker-speed': `${flickerSpeed}s`,
    '--wave-frequency': `${waveFrequency}s`,
    '--initial-scale': `${initialScale}`,
    '--peak-scale': `${peakScale}`,
    '--final-scale': `${finalScale}`,
  };

  return (
    <div
      className={`aura-particle ${isLargeParticle ? 'large-particle' : 'small-particle'}`}
      style={style}
    />
  );
});

const KatanaWithAura: React.FC<KatanaWithAuraProps> = ({ className = '', style = {} }) => {
  const particles = useMemo(
    () => Array.from({ length: PARTICLE_COUNT }).map(createParticle),
    []
  );

  return (
    <div className={`relative ${className}`} style={style}>
      <img
        src="/katana.png"
        alt="Katana"
        style={{ width: '512px', height: '512px' }}
        className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 blur-[1.5px]"
      />
      
      <div className="absolute inset-0 pointer-events-none z-10">
        {particles.map((p, i) => (
          <Particle key={i} particle={p} />
        ))}
      </div>
    </div>
  );
};

export default KatanaWithAura;