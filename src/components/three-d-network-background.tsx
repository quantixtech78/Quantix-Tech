"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Pointer = {
  x: number;
  y: number;
};

function AnimatedModel({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<Pointer>;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const shapeARef = useRef<THREE.Group>(null);
  const shapeBRef = useRef<THREE.Group>(null);
  const shapeCRef = useRef<THREE.Group>(null);

  const shapeAGeometry = useMemo(
    () => new THREE.IcosahedronGeometry(1.2, 0),
    [],
  );
  const shapeBGeometry = useMemo(
    () => new THREE.OctahedronGeometry(0.9, 0),
    [],
  );
  const shapeCGeometry = useMemo(
    () => new THREE.TetrahedronGeometry(0.85, 0),
    [],
  );

  useFrame(() => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.rotation.x += 0.001;
    rootRef.current.rotation.y += 0.0015;
    rootRef.current.rotation.x +=
      (mouseRef.current.y * 0.18 - rootRef.current.rotation.x) * 0.02;
    rootRef.current.rotation.y +=
      (mouseRef.current.x * 0.25 - rootRef.current.rotation.y) * 0.02;

    if (shapeARef.current) {
      shapeARef.current.rotation.x += 0.002;
      shapeARef.current.rotation.z += 0.0014;
    }

    if (shapeBRef.current) {
      shapeBRef.current.rotation.y -= 0.0018;
      shapeBRef.current.rotation.x += 0.001;
    }

    if (shapeCRef.current) {
      shapeCRef.current.rotation.z += 0.0022;
      shapeCRef.current.rotation.y += 0.0012;
    }
  });

  useEffect(() => {
    return () => {
      shapeAGeometry.dispose();
      shapeBGeometry.dispose();
      shapeCGeometry.dispose();
    };
  }, [shapeAGeometry, shapeBGeometry, shapeCGeometry]);

  return (
    <group ref={rootRef}>
      <lineSegments ref={shapeARef} position={[-1.9, 0.2, -0.3]}>
        <edgesGeometry args={[shapeAGeometry, 18]} />
        <lineBasicMaterial color="#1e3a5f" transparent opacity={0.35} />
      </lineSegments>

      <lineSegments ref={shapeBRef} position={[1.6, -0.1, 0.2]}>
        <edgesGeometry args={[shapeBGeometry, 16]} />
        <lineBasicMaterial color="#0ea5e9" transparent opacity={0.28} />
      </lineSegments>

      <lineSegments ref={shapeCRef} position={[0, 1.6, -0.15]}>
        <edgesGeometry args={[shapeCGeometry, 12]} />
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.24} />
      </lineSegments>

      <line position={[0, -1.5, -0.2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -2.2, 0, 0, -0.7, 0.15, -0.2, 0.7, -0.1, 0.25, 2.1, 0.1, 0,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1e3a5f" transparent opacity={0.22} />
      </line>
    </group>
  );
}

export function ThreeDNetworkBackground({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!containerRef.current) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!isInside) {
        return;
      }

      const normalizedX =
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = -(
        ((event.clientY - bounds.top) / bounds.height) * 2 -
        1
      );

      mouseRef.current.x = normalizedX;
      mouseRef.current.y = normalizedY;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    >
      <Canvas
        className="h-full w-full"
        dpr={[1, 2]}
        frameloop="always"
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "highp",
        }}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.55} color="#ffffff" />
        <pointLight position={[4, 4, 6]} intensity={0.6} color="#7dd3fc" />
        <AnimatedModel mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
