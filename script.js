import Grid from "./grid.js";
import { getDistanceBetween, generateParticles } from "./utils.js";

const ctx = document
  .getElementById("canvas")
  .getContext("2d", { alpha: false });

const NUMBER_OF_PARTICLES = 150;
const GRID_CELL_SIZE = 50;
const MOUSE_CONNECTION_RANGE = 150;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

let particles = [];
let grid = [];
let mouseX;
let mouseY;

const createMouseConnections = () => {
  if (!mouseX || !mouseY) return;

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
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  // Setup grid
  grid = new Grid(CANVAS_WIDTH, CANVAS_HEIGHT, GRID_CELL_SIZE);
  particles = generateParticles(NUMBER_OF_PARTICLES);
  grid.addParticles(particles);

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
