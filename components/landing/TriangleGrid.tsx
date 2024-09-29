"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

const TriangleGrid = () => {
  const grid = [14, 30];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set("#triangle-grid", { opacity: 1 });
      gsap.set(".triangle-grid-item", {
        opacity: 0.2,
        scale: 1,
      });
      return;
    }

    gsap.set(".triangle-grid-item", {
      opacity: 0,
      transformOrigin: "center",
      color: "#fff",
    });

    gsap.set("#triangle-grid", { opacity: 1 });

    const tl = gsap.timeline();

    tl.to(".triangle-grid-item", {
      keyframes: [
        {
          opacity: 0,
          duration: 0,
        },
        {
          opacity: 0.4,
          rotate: "+=180",
          color: "#A78BFA",
          scale: 3,
          duration: 0.6,
          stagger: {
            amount: 2,
            grid: grid,
            from: "center",
          },
        },
        {
          opacity: 0.2,
          rotate: "+=180",
          color: "#fff",
          scale: 1,
          delay: -2,
          duration: 0.6,
          stagger: {
            amount: 3,
            grid: grid,
            from: "center",
          },
        },
      ],
    });

    tl.to(".triangle-grid-item", {
      delay: 12,
      repeat: -1,
      repeatDelay: 12,
      keyframes: [
        {
          opacity: 0.4,
          rotate: "+=180",
          color: "#A78BFA",
          scale: 3,
          duration: 0.6,
          stagger: {
            amount: 2,
            grid: grid,
            from: "center",
          },
        },
        {
          opacity: 0.2,
          rotate: "+=180",
          color: "#fff",
          scale: 1,
          delay: -2,
          duration: 0.6,
          stagger: {
            amount: 3,
            grid: grid,
            from: "center",
          },
        },
      ],
    });
  }, []);

  const renderGridItems = () => {
    const items = [];
    for (let i = 0; i < grid[0]; i++) {
      for (let j = 0; j < grid[1]; j++) {
        items.push(
          <path
            key={`${i}-${j}`}
            fill="black"
            opacity=".2"
            className="triangle-grid-item"
            d={`M${j * 32 + 5},${i * 32 + 10}l-3.75,2.165l0,-4.33l3.75,2.165z`}
          />
        );
      }
    }
    return items;
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 935 425"
      id="triangle-grid"
      style={{
        opacity: 0,
        maskImage: "linear-gradient(black, transparent)",
        width: "80%",
      }}
    >
      <g className="triangle-grid-group">{renderGridItems()}</g>
    </svg>
  );
};

export default TriangleGrid;
