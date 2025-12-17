import { getRandomNumber, getDistanceBetween } from "./utils.js";

const ctx = document
  .getElementById("canvas")
  .getContext("2d", { alpha: false });

const NUMBER_OF_PARTICLES = 100;
const DISTANCE_BETWEEN = 100;
const DEFAULT_PARTICLE_SIZE = 5;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

let particles = [];
let mouseX;
let mouseY;

class Particle {
  constructor(x, y, size = DEFAULT_PARTICLE_SIZE) {
    this.posX = x;
    this.posY = y;
    this.size = size;
    this.velX = getRandomNumber(-1.5, 1.5);
    this.velY = getRandomNumber(-1.5, 1.5);
  }

  draw(ctx) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  move() {
    const newPosX = this.posX + this.velX;
    const newPosY = this.posY + this.velY;

    if (newPosX < 0 || newPosX > CANVAS_WIDTH) {
      this.velX = -this.velX;
    }
    if (newPosY < 0 || newPosY > CANVAS_HEIGHT) {
      this.velY = -this.velY;
    }

    this.posX = newPosX;
    this.posY = newPosY;
  }

  drawLine(ctx, toPosition, distance) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${distance / DISTANCE_BETWEEN})`;
    ctx.moveTo(this.posX, this.posY);
    ctx.lineTo(toPosition.posX, toPosition.posY);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  create_connections(ctx) {
    for (let a = 0; a < NUMBER_OF_PARTICLES - 1; a++) {
      const particleA = particles[a];

      for (let b = a + 1; b < NUMBER_OF_PARTICLES; b++) {
        const particleB = particles[b];
        const distanceBetween = getDistanceBetween(particleA, particleB);

        if (distanceBetween < DISTANCE_BETWEEN) {
          particleA.drawLine(ctx, particles[b], distanceBetween);
        }
      }

      if (mouseX && mouseY) {
        const distanceBetween = getDistanceBetween(particleA, {
          posX: mouseX,
          posY: mouseY,
        });
        if (distanceBetween < DISTANCE_BETWEEN) {
          particleA.drawLine(
            ctx,
            { posX: mouseX, posY: mouseY },
            distanceBetween
          );
        }
      }
    }
  }
}

const generateParticles = () => {
  const particles = [];

  for (let i = 0; i <= NUMBER_OF_PARTICLES; i++) {
    const randX = Math.floor(getRandomNumber(0, CANVAS_WIDTH));
    const randY = Math.floor(getRandomNumber(0, CANVAS_HEIGHT));
    const randSize = getRandomNumber(1, 5);
    const newParticle = new Particle(randX, randY, randSize);

    particles.push(newParticle);
  }

  return particles;
};

const draw = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  particles.forEach((particle, index) => {
    particle.move();
    particle.create_connections(ctx);
    particle.draw(ctx, index);
  });

  window.requestAnimationFrame(draw);
};

const init = () => {
  // Populate first particles
  particles = generateParticles();

  // Setup canvas
  const canvas = document.getElementById("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  // Add mouse interaction
  const handleMouseOver = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };
  document.addEventListener("mousemove", handleMouseOver);

  // Start loop
  window.requestAnimationFrame(draw);
};

init();
