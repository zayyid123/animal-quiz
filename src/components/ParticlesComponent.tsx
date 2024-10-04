"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";
import { Engine } from "tsparticles-engine"; // Import Engine type
import type { ISourceOptions } from "tsparticles-engine"; // Import type for options

const ParticlesComponent = () => {

  // Define options with proper typing
  const option: ISourceOptions = useMemo(() => {
    return {
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        move: {
          enable: true,
          speed: { min: 0.5, max: 1.5 }, // Reduce speed for smoother movement
          direction: "none", // Free movement in all directions
          outModes: {
            default: "bounce", // Particles will bounce off the edges
          },
          random: true, // Random movement for smoother interaction
          straight: false, // Non-linear motion
        },
        number: {
          value: 30
        },
        opacity: {
          value: 1,
        },
        rotate: {
          path: false,
        },
        shape: {
          type: "images",
          stroke: {
            width: 0,
            color: "#000",
          },
          images: [
            {
              src: "http://localhost:3000/pictures/animal/cat.png",
              width: 150,
              height: 150,
            },
            {
              src: "http://localhost:3000/pictures/animal/chameleon.png",
              width: 150,
              height: 150,
            },
            {
              src: "http://localhost:3000/pictures/animal/crab.png",
              width: 150,
              height: 150,
            },
            {
              src: "http://localhost:3000/pictures/animal/crocodile.png",
              width: 150,
              height: 150,
            },
            {
              src: "http://localhost:3000/pictures/animal/dolphin.png",
              width: 150,
              height: 150,
            },
            {
              src: "http://localhost:3000/pictures/animal/elephant.png",
              width: 150,
              height: 150,
            },
            {
              src: "http://localhost:3000/pictures/animal/fox.png",
              width: 150,
              height: 150,
            },
          ],
        },
        size: {
          value: {
            min: 20,
            max: 50,
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // Particles will repel when the mouse hovers
          },
          onClick: {
            enable: true,
            mode: "push", // Add more particles on click
          },
        },
        modes: {
          repulse: {
            distance: 60, // Increase the distance for smoother interaction
            duration: 0.2, // Add a slight delay for smoother repulse effect
            speed: 1, // Adjust speed to make movement smoother
            easing: "ease-in-out", // Use easing for smoother movement
          },
          push: {
            quantity: 4, // Number of particles to add on click
          },
        },
      },
    };
  }, []);

  // Add typing for the particlesInit callback
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    // loadFull(engine) can be used instead of loadSlim if you need the full version
  }, []);

  return <Particles id="tsparticles" init={particlesInit} options={option} />;
};

export default ParticlesComponent;
