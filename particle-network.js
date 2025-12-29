import Grid from "./grid.js";
import { generateParticles, getDistanceBetween } from "./utils.js";

class ParticleNetwork {
  constructor(canvas, options = {}) {
    const {
      numberOfParticles = 150,
      gridCellSize = 50,
      mouseConnectionRange = 150,
    } = options;

    this.canvas = canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d", { alpha: false });

    this.gridCellSize = gridCellSize;
    this.grid = new Grid(this.canvas.width, this.canvas.height, gridCellSize);
    this.particles = generateParticles(
      numberOfParticles,
      this.canvas.width,
      this.canvas.height
    );
    this.grid.addParticles(this.particles);

    this.mouseConnectionRange = mouseConnectionRange;
    this.mouseX = null;
    this.mouseY = null;
    this.resizeTimer = null;

    // Add mouse interaction
    const handleMouseOver = (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    };
    canvas.addEventListener("mousemove", handleMouseOver);

    // Handle window resize
    const handleResize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.particles = [];
      this.grid = null;
      clearTimeout(this.resizeTimer);

      this.resizeTimer = setTimeout(() => {
        this.grid = new Grid(
          window.innerWidth,
          window.innerHeight,
          gridCellSize
        );
        this.particles = generateParticles(numberOfParticles);
        this.grid.addParticles(this.particles);
        console.log({ particles: this.particles, grid: this.grid }, 222);
        this.resizeTimer = null;
        window.requestAnimationFrame(() => this.draw());
      }, 300);
    };
    window.addEventListener("resize", handleResize);
  }

  draw() {
    if (!!this.resizeTimer) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      particle.move();
      particle.create_connections(this.ctx, this.grid);
      particle.draw(this.ctx, index);
    });

    this.createMouseConnections();
    this.grid.updateParticles(this.particles);
    window.requestAnimationFrame(() => this.draw());
  }

  createMouseConnections() {
    if (!this.mouseX || !this.mouseY || !!this.resizeTimer) return;

    const cellCol = Math.floor(this.mouseX / this.gridCellSize);
    const cellRow = Math.floor(this.mouseY / this.gridCellSize);
    const neighbors = this.grid.getNeighbors(
      { col: cellCol, row: cellRow },
      this.mouseConnectionRange
    );

    if (neighbors && neighbors.length > 0) {
      for (const particle of neighbors) {
        particle.drawLine(
          this.ctx,
          { posX: this.mouseX, posY: this.mouseY },
          getDistanceBetween(
            { posX: this.mouseX, posY: this.mouseY },
            particle
          ),
          this.mouseConnectionRange
        );
      }
    }
  }

  start() {
    window.requestAnimationFrame(() => this.draw());
  }
}

export default ParticleNetwork;
