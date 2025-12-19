import Grid from "./grid.js";
import { getDistanceBetween, generateParticles } from "./utils.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });

const NUMBER_OF_PARTICLES = 150;
const GRID_CELL_SIZE = 50;
const MOUSE_CONNECTION_RANGE = 150;

let resizeTimer;
let particles = [];
let grid;
let mouseX;
let mouseY;

const createMouseConnections = () => {
  if (!mouseX || !mouseY || !!resizeTimer) return;

  const cellCol = Math.floor(mouseX / GRID_CELL_SIZE);
  const cellRow = Math.floor(mouseY / GRID_CELL_SIZE);
  const neighbors = grid.getNeighbors(
    { col: cellCol, row: cellRow },
    MOUSE_CONNECTION_RANGE
  );

  if (neighbors && neighbors.length > 0) {
    for (const particle of neighbors) {
      particle.drawLine(
        ctx,
        { posX: mouseX, posY: mouseY },
        getDistanceBetween({ posX: mouseX, posY: mouseY }, particle),
        MOUSE_CONNECTION_RANGE
      );
    }
  }
};

const draw = () => {
  if (!!resizeTimer) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.move();
    particle.create_connections(ctx, grid);
    particle.draw(ctx, index);
  });

  createMouseConnections();

  grid.updateParticles(particles);

  window.requestAnimationFrame(draw);
};

const init = () => {
  // Setup canvas
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Setup grid
  grid = new Grid(canvas.width, canvas.height, GRID_CELL_SIZE);
  particles = generateParticles(NUMBER_OF_PARTICLES);
  grid.addParticles(particles);

  // Add mouse interaction
  const handleMouseOver = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };
  document.addEventListener("mousemove", handleMouseOver);

  // Handle window resize
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];
    grid = null;
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      grid = new Grid(window.innerWidth, window.innerHeight, GRID_CELL_SIZE);
      particles = generateParticles(NUMBER_OF_PARTICLES);
      grid.addParticles(particles);
      resizeTimer = null;
      window.requestAnimationFrame(draw);
    }, 300);
  };
  window.addEventListener("resize", handleResize);

  // Start loop
  window.requestAnimationFrame(draw);
};

init();
