"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Engine } from "tsparticles-engine"; // Import Engine type
import type { ISourceOptions } from "tsparticles-engine"; // Import type for options

const ParticlesComponent = () => {
  const [origin, setorigin] = useState("");

  useEffect(() => {
    if (window) {
      setorigin(window.origin);
    }
  }, []);

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
          value: 15,
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
              src: `${origin}/pictures/animal/cat.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/chameleon.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/crab.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/crocodile.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/dolphin.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/elephant.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/fox.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/frog.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/giraffe.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/koala.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/lion.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/owl.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/penguin.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/rabbit.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/sea-turtle.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/shark.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/sheep.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/sloth.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/snail.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/snake.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/squirrel.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/turtle.png`,
              width: 150,
              height: 150,
            },
            {
              src: `${origin}/pictures/animal/whale.png`,
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
      // background: {
      //   color: {
      //     value: "#6d28d9"
      //   }
      // }
    };
  }, []);

  // Add typing for the particlesInit callback
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    // loadFull(engine) can be used instead of loadSlim if you need the full version
  }, []);

  return (
    <>
      <Particles id="tsparticles" init={particlesInit} options={option} />
      {/* bg */}
      <div className="w-full h-screen absolute top-0 right-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </>
  );
};

export default ParticlesComponent;
