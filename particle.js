import { getRandomNumber, getDistanceBetween } from "./utils.js";

const canvas = document.getElementById("canvas");
const DEFAULT_PARTICLE_RADIUS = 5;

class Particle {
  constructor(x, y, radius = DEFAULT_PARTICLE_RADIUS) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.velX = getRandomNumber(-1.5, 1.5);
    this.velY = getRandomNumber(-1.5, 1.5);
  }

  get range() {
    return this.radius * 50;
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  move() {
    let newPosX = this.posX + this.velX;
    let newPosY = this.posY + this.velY;

    if (newPosX < 0 || newPosX > canvas.width) {
      this.velX = -this.velX;
      newPosX = this.posX;
    }
    if (newPosY < 0 || newPosY > canvas.height) {
      this.velY = -this.velY;
      newPosY = this.posY;
    }

    this.posX = newPosX;
    this.posY = newPosY;
  }

  drawLine(ctx, toPosition, distance, range = this.range) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / range})`;
    ctx.moveTo(this.posX, this.posY);
    ctx.lineTo(toPosition.posX, toPosition.posY);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  create_connections(ctx, grid) {
    const neighbors = grid.getNeighbors(this.gridCell, this.range);

    if (neighbors && neighbors.length > 0) {
      for (const neighbor of neighbors) {
        const distanceBetween = getDistanceBetween(this, neighbor);
        if (distanceBetween < this.range) {
          this.drawLine(ctx, neighbor, distanceBetween);
        }
      }
    }
  }
}

export default Particle;
