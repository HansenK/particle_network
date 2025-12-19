import Particle from "./particle.js";

const canvas = document.getElementById("canvas");

export const getRandomNumber = (min = 0, max = 1, round = false) => {
  if (max <= min) {
    throw new Error("Make sure max value is greater than min values");
  }
  const randomNumber = Math.random() * (max - min) + min;
  return round ? Math.round(randomNumber) : randomNumber;
};

export const getDistanceBetween = (
  { posX: posAX, posY: posAY },
  { posX: posBX, posY: posBY }
) => {
  return Math.sqrt(
    Math.pow(Math.abs(posAX - posBX), 2) + Math.pow(Math.abs(posAY - posBY), 2)
  );
};

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
