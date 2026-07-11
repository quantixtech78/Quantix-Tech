"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";

type ClusterParticle = {
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
  amplitude: number;
};

type MeshCluster = {
  centerX: number;
  centerY: number;
  radius: number;
  driftX: number;
  driftY: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  particles: ClusterParticle[];
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

export type AnimatedNetworkBackgroundProps = {
  clusterCount?: number;
  minParticlesPerCluster?: number;
  maxParticlesPerCluster?: number;
  lineColor?: string;
  lineOpacity?: number;
  movementSpeed?: number;
  movementRadius?: number;
  spacing?: number;
  interactive?: boolean;
  className?: string;
};

const DEFAULT_CLUSTER_COUNT = 11;
const DEFAULT_MIN_PARTICLES = 6;
const DEFAULT_MAX_PARTICLES = 15;
const DEFAULT_LINE_COLOR = "#1e3a5f";
const DEFAULT_LINE_OPACITY = 0.14;
const DEFAULT_MOVEMENT_SPEED = 0.45;
const DEFAULT_MOVEMENT_RADIUS = 14;
const DEFAULT_SPACING = 110;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const colorToRgba = (hexColor: string, opacity: number) => {
  const hex = hexColor.replace("#", "");
  const normalized =
    hex.length === 3
      ? `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
      : hex;

  const safe = /^[0-9a-fA-F]{6}$/.test(normalized) ? normalized : "1e3a5f";

  const red = Number.parseInt(safe.slice(0, 2), 16);
  const green = Number.parseInt(safe.slice(2, 4), 16);
  const blue = Number.parseInt(safe.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const createClusterParticles = (
  count: number,
  movementRadius: number,
  clusterRadius: number,
): ClusterParticle[] => {
  const particles: ClusterParticle[] = [];

  for (let index = 0; index < count; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const localRadius = Math.sqrt(Math.random()) * clusterRadius;

    particles.push({
      baseX: Math.cos(angle) * localRadius,
      baseY: Math.sin(angle) * localRadius,
      offsetX: 0,
      offsetY: 0,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqX: randomBetween(0.45, 0.65),
      freqY: randomBetween(0.45, 0.65),
      amplitude: randomBetween(movementRadius * 0.55, movementRadius),
    });
  }

  return particles;
};

const createClusters = (
  width: number,
  height: number,
  clusterCount: number,
  minParticles: number,
  maxParticles: number,
  spacing: number,
  movementRadius: number,
): MeshCluster[] => {
  const clusters: MeshCluster[] = [];
  const attemptsLimit = clusterCount * 36;
  let attempts = 0;

  while (clusters.length < clusterCount && attempts < attemptsLimit) {
    attempts += 1;

    const radius = randomBetween(42, 92);
    const centerX = randomBetween(-width * 0.12, width * 1.12);
    const centerY = randomBetween(-height * 0.1, height * 1.1);

    let canPlace = true;
    for (let index = 0; index < clusters.length; index += 1) {
      const other = clusters[index];
      const distance = Math.hypot(
        centerX - other.centerX,
        centerY - other.centerY,
      );
      if (distance < spacing) {
        canPlace = false;
        break;
      }
    }

    if (!canPlace) {
      continue;
    }

    const particleCount = Math.round(randomBetween(minParticles, maxParticles));

    clusters.push({
      centerX,
      centerY,
      radius,
      driftX: randomBetween(-12, 12),
      driftY: randomBetween(-12, 12),
      driftPhaseX: Math.random() * Math.PI * 2,
      driftPhaseY: Math.random() * Math.PI * 2,
      driftSpeedX: randomBetween(0.06, 0.14),
      driftSpeedY: randomBetween(0.05, 0.12),
      particles: createClusterParticles(particleCount, movementRadius, radius),
    });
  }

  if (clusters.length < clusterCount) {
    for (let index = clusters.length; index < clusterCount; index += 1) {
      const radius = randomBetween(42, 92);
      const particleCount = Math.round(
        randomBetween(minParticles, maxParticles),
      );
      clusters.push({
        centerX: randomBetween(-width * 0.12, width * 1.12),
        centerY: randomBetween(-height * 0.1, height * 1.1),
        radius,
        driftX: randomBetween(-12, 12),
        driftY: randomBetween(-12, 12),
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftSpeedX: randomBetween(0.06, 0.14),
        driftSpeedY: randomBetween(0.05, 0.12),
        particles: createClusterParticles(
          particleCount,
          movementRadius,
          radius,
        ),
      });
    }
  }

  return clusters;
};

const drawClusters = (
  context: CanvasRenderingContext2D,
  clusters: MeshCluster[],
  pointer: PointerState,
  width: number,
  height: number,
  lineColor: string,
  lineOpacity: number,
  movementSpeed: number,
  movementRadius: number,
  interactive: boolean,
  timeSeconds: number,
) => {
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  for (
    let clusterIndex = 0;
    clusterIndex < clusters.length;
    clusterIndex += 1
  ) {
    const cluster = clusters[clusterIndex];

    const driftOffsetX =
      Math.sin(
        timeSeconds * cluster.driftSpeedX * movementSpeed + cluster.driftPhaseX,
      ) * cluster.driftX;
    const driftOffsetY =
      Math.cos(
        timeSeconds * cluster.driftSpeedY * movementSpeed + cluster.driftPhaseY,
      ) * cluster.driftY;

    let pointerPushX = 0;
    let pointerPushY = 0;

    if (interactive && pointer.active) {
      const dx = cluster.centerX + driftOffsetX - pointer.x;
      const dy = cluster.centerY + driftOffsetY - pointer.y;
      const distance = Math.hypot(dx, dy);
      const interactionRadius = 180;

      if (distance > 0 && distance < interactionRadius) {
        const influence = (1 - distance / interactionRadius) * 14;
        pointerPushX = (dx / distance) * influence;
        pointerPushY = (dy / distance) * influence;
      }
    }

    const points: Array<{ x: number; y: number }> = [];

    for (
      let pointIndex = 0;
      pointIndex < cluster.particles.length;
      pointIndex += 1
    ) {
      const particle = cluster.particles[pointIndex];

      const waveX =
        Math.sin(
          timeSeconds * movementSpeed * particle.freqX + particle.phaseX,
        ) * particle.amplitude;
      const waveY =
        Math.cos(
          timeSeconds * movementSpeed * particle.freqY + particle.phaseY,
        ) * particle.amplitude;

      particle.offsetX += (waveX - particle.offsetX) * 0.05;
      particle.offsetY += (waveY - particle.offsetY) * 0.05;

      points.push({
        x:
          cluster.centerX +
          driftOffsetX +
          pointerPushX +
          particle.baseX +
          particle.offsetX,
        y:
          cluster.centerY +
          driftOffsetY +
          pointerPushY +
          particle.baseY +
          particle.offsetY,
      });
    }

    for (let first = 0; first < points.length; first += 1) {
      for (let second = first + 1; second < points.length; second += 1) {
        const p1 = points[first];
        const p2 = points[second];
        const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const maxDistance = cluster.radius * 1.1;

        if (distance > maxDistance) {
          continue;
        }

        const alpha = clamp(
          lineOpacity * (1 - distance / maxDistance),
          0.02,
          lineOpacity,
        );
        context.strokeStyle = colorToRgba(lineColor, alpha);
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
      }
    }

    for (let pointIndex = 0; pointIndex < points.length; pointIndex += 1) {
      const point = points[pointIndex];
      context.fillStyle = colorToRgba(
        lineColor,
        clamp(lineOpacity + 0.04, 0.08, 0.2),
      );
      context.beginPath();
      context.arc(point.x, point.y, 1.1, 0, Math.PI * 2);
      context.fill();
    }
  }
};

export function AnimatedNetworkBackground({
  clusterCount = DEFAULT_CLUSTER_COUNT,
  minParticlesPerCluster = DEFAULT_MIN_PARTICLES,
  maxParticlesPerCluster = DEFAULT_MAX_PARTICLES,
  lineColor = DEFAULT_LINE_COLOR,
  lineOpacity = DEFAULT_LINE_OPACITY,
  movementSpeed = DEFAULT_MOVEMENT_SPEED,
  movementRadius = DEFAULT_MOVEMENT_RADIUS,
  spacing = DEFAULT_SPACING,
  interactive = true,
  className = "",
}: AnimatedNetworkBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clustersRef = useRef<MeshCluster[]>([]);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const activeLineColor = resolvedTheme === "dark" ? "#ffffff" : lineColor;

  const safeClusterCount = useMemo(
    () => clamp(Math.round(clusterCount), 8, 15),
    [clusterCount],
  );
  const safeMinParticles = useMemo(
    () => clamp(Math.round(minParticlesPerCluster), 6, 15),
    [minParticlesPerCluster],
  );
  const safeMaxParticles = useMemo(
    () => clamp(Math.round(maxParticlesPerCluster), safeMinParticles, 15),
    [maxParticlesPerCluster, safeMinParticles],
  );
  const safeLineOpacity = useMemo(
    () => clamp(lineOpacity, 0.1, 0.2),
    [lineOpacity],
  );
  const safeMovementRadius = useMemo(
    () => clamp(movementRadius, 10, 20),
    [movementRadius],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = true;
    let startTime = 0;

    const rebuildClusters = () => {
      clustersRef.current = createClusters(
        width,
        height,
        safeClusterCount,
        safeMinParticles,
        safeMaxParticles,
        spacing,
        safeMovementRadius,
      );
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      width = parent.clientWidth;
      height = parent.clientHeight;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      rebuildClusters();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!interactive) {
        return;
      }

      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const inside =
        x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;

      pointerRef.current.active = inside;
      if (!inside) {
        return;
      }

      pointerRef.current.x = x;
      pointerRef.current.y = y;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const tick = (timestamp: number) => {
      if (!visible) {
        animationFrame = 0;
        return;
      }

      if (!startTime) {
        startTime = timestamp;
      }

      const elapsedSeconds = (timestamp - startTime) / 1000;

      drawClusters(
        context,
        clustersRef.current,
        pointerRef.current,
        width,
        height,
        activeLineColor,
        safeLineOpacity,
        movementSpeed,
        safeMovementRadius,
        interactive,
        elapsedSeconds,
      );

      animationFrame = window.requestAnimationFrame(tick);
    };

    resize();
    animationFrame = window.requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(resize);
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [
    interactive,
    activeLineColor,
    movementSpeed,
    safeClusterCount,
    safeLineOpacity,
    safeMaxParticles,
    safeMinParticles,
    safeMovementRadius,
    spacing,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
