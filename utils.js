import Particle from "./particle.js";

const canvas = document.getElementById("canvas");

/**
 * Generates a random integer within a specified inclusive range.
 * Both min and max values are inclusive.
 * Throws an error if max is less than min.
 *
 * @param {number} [min=0] - The minimum integer value (inclusive).
 * @param {number} [max=1] - The maximum integer value (inclusive).
 * @returns {number} A random integer between min and max (inclusive).
 * @throws {Error} If max is less than min.
 */
export const getRandomNumber = (min = 0, max = 1) => {
  if (max < min) {
    throw new Error("Make sure max value is greater than min value");
  }

  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

/**
 * Calculates the Euclidean distance between two points in 2D space.
 * Uses the Pythagorean theorem to compute the straight-line distance.
 *
 * @param {Object} pointA - The first point with x and y coordinates
 * @param {number} pointA.posX - X coordinate of the first point
 * @param {number} pointA.posY - Y coordinate of the first point
 * @param {Object} pointB - The second point with x and y coordinates
 * @param {number} pointB.posX - X coordinate of the second point
 * @param {number} pointB.posY - Y coordinate of the second point
 * @returns {number} The distance between the two points
 */
export const getDistanceBetween = (
  { posX: posAX, posY: posAY },
  { posX: posBX, posY: posBY }
) => {
  return Math.sqrt(
    Math.pow(Math.abs(posAX - posBX), 2) + Math.pow(Math.abs(posAY - posBY), 2)
  );
};

/**
 * Generates an array of Particle objects with random positions and sizes.
 * Each particle is placed at a random position within the canvas bounds
 * and assigned a random radius between 1 and 4 pixels.
 *
 * @param {number} numberOfParticles - The number of particles to generate
 * @returns {Particle[]} An array of Particle instances
 */
export const generateParticles = (numberOfParticles) => {
  const particles = [];
  for (let i = 0; i <= numberOfParticles; i++) {
    const randX = Math.floor(getRandomNumber(0, canvas.width));
    const randY = Math.floor(getRandomNumber(0, canvas.height));
    const randRadius = getRandomNumber(1, 4);
    const newParticle = new Particle(randX, randY, randRadius);

    particles.push(newParticle);
  }

  return particles;
};
