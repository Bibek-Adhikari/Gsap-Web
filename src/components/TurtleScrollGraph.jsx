import React, { useEffect, useMemo, useRef } from "react";

// tiny turtle engine
function makeTurtle(ctx, startX, startY, startAngle = -90) {
  const t = { x: startX, y: startY, a: (startAngle * Math.PI) / 180 };
  return {
    forward(len) {
      const nx = t.x + Math.cos(t.a) * len;
      const ny = t.y + Math.sin(t.a) * len;
      ctx.lineTo(nx, ny);
      t.x = nx;
      t.y = ny;
    },
    left(deg) {
      t.a -= (deg * Math.PI) / 180;
    },
    right(deg) {
      t.a += (deg * Math.PI) / 180;
    },
    moveTo(x, y) {
      t.x = x;
      t.y = y;
      ctx.moveTo(x, y);
    },
    get state() {
      return t;
    },
  };
}

export function TurtleScrollGraph({ progress = 0 }) {
  const canvasRef = useRef(null);

  // predefine a “program” (like turtle commands) for your scroll graph
  const program = useMemo(() => {
    // This draws a wavy “growth” line. You can change turns/lengths.
    // Each item is one step: { turnDeg, stepLen }
    const steps = [];
    for (let i = 0; i < 120; i++) {
      const turn = Math.sin(i * 0.25) * 6; // gentle oscillation
      const len = 3.2; // step length
      steps.push({ turnDeg: turn, stepLen: len });
    }
    return steps;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    if (!parent) return;

    const w = parent.clientWidth;
    const h = parent.clientHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // clear
    ctx.clearRect(0, 0, w, h);

    // style (don’t use Tailwind on canvas, set here)
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // subtle background grid (optional)
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 24) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += 24) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "#34d399"; // teal-ish
    ctx.stroke();

    // draw turtle path based on scroll progress
    const count = Math.floor(program.length * Math.max(0, Math.min(1, progress)));

    ctx.globalAlpha = 0.9;
    ctx.beginPath();

    // start near bottom-left
    const startX = 18;
    const startY = h - 18;

    const turtle = makeTurtle(ctx, startX, startY, -45); // angle points up-right
    turtle.moveTo(startX, startY);

    for (let i = 0; i < count; i++) {
      const { turnDeg, stepLen } = program[i];
      turtle.right(turnDeg);
      turtle.forward(stepLen);
    }

    ctx.strokeStyle = "#34d399";
    ctx.stroke();

    // draw a “cursor dot” at the turtle head
    const { x, y } = turtle.state;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, 4.2, 0, Math.PI * 2);
    ctx.fillStyle = "#34d399";
    ctx.fill();
  }, [progress, program]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-70"
      aria-hidden="true"
    />
  );
}
