"use client";

import { useEffect, useRef, useState } from "react";

interface WaterDropIntroProps {
  onComplete?: () => void;
}

export default function WaterDropIntro({ onComplete }: WaterDropIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Respect user's reduced motion setting
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // time in seconds

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      if (elapsed < 0.4) {
        // ==========================================
        // SCENE 1 (0.0 - 0.4s): Marine Dark Blue (#0A1C3A)
        // No text, no spinners, no extra elements.
        // ==========================================
        ctx.fillStyle = "#0A1C3A";
        ctx.fillRect(0, 0, width, height);

      } else if (elapsed < 1.3) {
        // ==========================================
        // SCENE 2 (0.4 - 1.3s): Falling Water Droplet
        // Gravity-based acceleration down to center.
        // ==========================================
        ctx.fillStyle = "#0A1C3A";
        ctx.fillRect(0, 0, width, height);

        const dropProgress = (elapsed - 0.4) / 0.9; // 0.0 to 1.0
        // Natural gravity acceleration curve (starts slow, accelerates down)
        const easedDrop = Math.pow(dropProgress, 2.2);

        const startY = height * 0.05;
        const targetY = centerY;
        const currentY = startY + (targetY - startY) * easedDrop;

        // Dynamic, responsive droplet dimensions
        const baseSize = Math.min(width, height) * 0.016;
        const radius = Math.max(10, Math.min(22, baseSize));
        
        // Elongate droplet slightly during falling motion
        const w = radius * (1 - easedDrop * 0.16);
        const h = radius * (1.1 + easedDrop * 0.42);

        // Soft fluid glow behind droplet
        const glowGrad = ctx.createRadialGradient(
          centerX, currentY, 0,
          centerX, currentY, h * 2.4
        );
        glowGrad.addColorStop(0, "rgba(147, 197, 253, 0.45)");
        glowGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.15)");
        glowGrad.addColorStop(1, "rgba(10, 28, 58, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, currentY, h * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Realistic liquid water teardrop shape
        ctx.beginPath();
        ctx.moveTo(centerX, currentY - h * 1.1);
        ctx.bezierCurveTo(
          centerX + w * 1.35, currentY - h * 0.2,
          centerX + w * 1.15, currentY + h * 0.75,
          centerX, currentY + h
        );
        ctx.bezierCurveTo(
          centerX - w * 1.15, currentY + h * 0.75,
          centerX - w * 1.35, currentY - h * 0.2,
          centerX, currentY - h * 1.1
        );
        ctx.closePath();

        // Pure white & translucent sky blue liquid gradient
        const dropGrad = ctx.createLinearGradient(
          centerX - w, currentY - h,
          centerX + w, currentY + h
        );
        dropGrad.addColorStop(0, "#FFFFFF");
        dropGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.98)");
        dropGrad.addColorStop(0.7, "rgba(224, 242, 254, 0.92)");
        dropGrad.addColorStop(1, "rgba(186, 230, 253, 0.85)");
        ctx.fillStyle = dropGrad;
        ctx.fill();

        // Specular highlight arc (top-left reflection)
        ctx.beginPath();
        ctx.ellipse(
          centerX - w * 0.3,
          currentY - h * 0.35,
          w * 0.35,
          h * 0.28,
          -Math.PI / 6,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();

        // Subtle liquid refraction glow at droplet base
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          currentY + h * 0.55,
          w * 0.48,
          h * 0.2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(56, 189, 248, 0.55)";
        ctx.fill();

      } else if (elapsed < 2.0) {
        // ==========================================
        // SCENE 3 (1.3 - 2.0s): Water Impact & Ripple Wave
        // Realistic circular ripple expanding outward.
        // ==========================================
        ctx.fillStyle = "#0A1C3A";
        ctx.fillRect(0, 0, width, height);

        const impactProgress = (elapsed - 1.3) / 0.7; // 0.0 to 1.0

        // Soft initial impact touch point (1.3s to 1.42s)
        if (impactProgress < 0.2) {
          const splashP = impactProgress / 0.2;
          const splashW = (1 - splashP * 0.5) * 18;
          const splashH = (1 - splashP) * 12;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, splashW, Math.max(1, splashH), 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${1 - splashP})`;
          ctx.fill();
        }

        // Concentric liquid ripple rings
        const rippleCount = 3;
        const maxRippleR = Math.min(width, height) * 0.34;

        for (let i = 0; i < rippleCount; i++) {
          const delay = i * 0.12;
          const ringP = Math.max(0, (impactProgress - delay) / (1 - delay));
          if (ringP > 0) {
            const easeRing = Math.pow(ringP, 0.75); // fluid wave speed
            const r = easeRing * maxRippleR;
            const alpha = Math.max(0, (1 - ringP) * 0.85);

            // Subtle liquid reflection glow inside ripple band
            const rGlow = ctx.createRadialGradient(
              centerX, centerY, Math.max(0, r - 14),
              centerX, centerY, r + 14
            );
            rGlow.addColorStop(0, "rgba(10, 28, 58, 0)");
            rGlow.addColorStop(0.5, `rgba(56, 189, 248, ${alpha * 0.35})`);
            rGlow.addColorStop(1, "rgba(10, 28, 58, 0)");

            ctx.beginPath();
            ctx.arc(centerX, centerY, r + 10, 0, Math.PI * 2);
            ctx.fillStyle = rGlow;
            ctx.fill();

            // Ripple Outer Ring (Light Sky Blue Reflection)
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha * 0.75})`;
            ctx.lineWidth = Math.max(1, 4.5 * (1 - ringP));
            ctx.stroke();

            // Ripple Core Highlight Ring (Crisp White)
            ctx.beginPath();
            ctx.arc(centerX, centerY, Math.max(0.5, r - 1.5), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
            ctx.lineWidth = Math.max(0.5, 2.2 * (1 - ringP));
            ctx.stroke();
          }
        }

        // Center specular reflection spot fading out
        const centerGlow = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, 42
        );
        centerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.45 * (1 - impactProgress)})`);
        centerGlow.addColorStop(0.5, `rgba(147, 197, 253, ${0.25 * (1 - impactProgress)})`);
        centerGlow.addColorStop(1, "rgba(10, 28, 58, 0)");
        ctx.beginPath();
        ctx.arc(centerX, centerY, 42, 0, Math.PI * 2);
        ctx.fillStyle = centerGlow;
        ctx.fill();

      } else if (elapsed < 3.0) {
        // ==========================================
        // SCENE 4 (2.0 - 3.0s): Website Reveal Mask
        // Expanding circular water ripple reveals FONS VITAE.
        // ==========================================
        const revealProgress = Math.min(1.0, (elapsed - 2.0) / 1.0); // 0.0 to 1.0
        
        // Smooth exponential ease-out expansion to fill the screen
        const easedReveal = Math.pow(revealProgress, 2.2);

        const maxMaskR = Math.hypot(width, height) * 0.8;
        const currentMaskR = easedReveal * maxMaskR;

        // 1. Fill Dark Blue background
        ctx.fillStyle = "#0A1C3A";
        ctx.fillRect(0, 0, width, height);

        // 2. Erase expanding circle to reveal the homepage beneath
        ctx.globalCompositeOperation = "destination-out";

        const maskGrad = ctx.createRadialGradient(
          centerX, centerY, Math.max(0, currentMaskR - 30),
          centerX, centerY, Math.max(1, currentMaskR)
        );
        maskGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
        maskGrad.addColorStop(0.85, "rgba(0, 0, 0, 1)");
        maskGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(centerX, centerY, currentMaskR, 0, Math.PI * 2);
        ctx.fillStyle = maskGrad;
        ctx.fill();

        // 3. Draw liquid reflection wave edge along the expanding reveal perimeter
        ctx.globalCompositeOperation = "source-over";

        const edgeAlpha = Math.max(0, 1 - Math.pow(revealProgress, 1.4));

        if (edgeAlpha > 0.01 && currentMaskR > 5) {
          // Liquid Wave Edge Radial Glow
          const edgeGlow = ctx.createRadialGradient(
            centerX, centerY, Math.max(0, currentMaskR - 35),
            centerX, centerY, currentMaskR + 30
          );
          edgeGlow.addColorStop(0, "rgba(10, 28, 58, 0)");
          edgeGlow.addColorStop(0.4, `rgba(56, 189, 248, ${0.45 * edgeAlpha})`);
          edgeGlow.addColorStop(0.7, `rgba(186, 230, 253, ${0.65 * edgeAlpha})`);
          edgeGlow.addColorStop(1, "rgba(10, 28, 58, 0)");

          ctx.beginPath();
          ctx.arc(centerX, centerY, currentMaskR + 18, 0, Math.PI * 2);
          ctx.fillStyle = edgeGlow;
          ctx.fill();

          // Outer Liquid Ripple Ring
          ctx.beginPath();
          ctx.arc(centerX, centerY, currentMaskR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(147, 197, 253, ${0.8 * edgeAlpha})`;
          ctx.lineWidth = 3.5;
          ctx.stroke();

          // Inner Pure White Specular Highlight Edge Ring
          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(0.5, currentMaskR - 3.5), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * edgeAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

      } else {
        // ==========================================
        // COMPLETE (>= 3.0s): Animation Finished
        // ==========================================
        setIsComplete(true);
        onComplete?.();
        ctx.restore();
        return;
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
      style={{ backgroundColor: "transparent" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
