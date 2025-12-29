import Particle from "./particle.js";

const canvas = document.getElementById("canvas");

/**
 * Generates a random number within a specified inclusive range.
 * Both min and max values are inclusive.
 * Returns floating points as well, not only integers unless `roud` is true.
 * Throws an error if max is less than min.
 *
 * @param {number} [min=0] - The minimum value (inclusive).
 * @param {number} [max=1] - The maximum value (inclusive).
 * @param {boolean} [roud=false] - If true, the result is rounded to the nearest integer.
 * @returns {number} A random number between min and max (inclusive), rounded if `roud` is true.
 * @throws {Error} If max is less than min.
 */
export const getRandomNumber = (min = 0, max = 1, roud = false) => {
  if (max < min) {
    throw new Error("Make sure max value is greater than min value");
  }
  const random = Math.random() * (max - min) + min;
  return roud ? Math.round(random) : random;
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
  for (let i = 0; i < numberOfParticles; i++) {
    const randX = Math.floor(getRandomNumber(0, canvas.width));
    const randY = Math.floor(getRandomNumber(0, canvas.height));
    const randRadius = getRandomNumber(2, 4, true);
    const newParticle = new Particle(randX, randY, randRadius);

    particles.push(newParticle);
  }

  return particles;
};

/**
 * Returns a random element from the provided list.
 *
 * @param {Array} list - The array of elements to choose from
 * @returns {*} A random element from the list
 */
export const getRandomFromList = (list) => {
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error("getRandomFromList: list must be a non-empty array");
  }
  return list[Math.floor(Math.random() * list.length)];
};
