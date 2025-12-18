class Grid {
  constructor(width, height, cellSize) {
    this.cellSize = cellSize;

    this.numCols = Math.ceil(width / cellSize);
    this.numRows = Math.ceil(height / cellSize);

    this.cells = [];

    for (let col = 0; col < this.numCols; col++) {
      this.cells[col] = [];
      for (let row = 0; row < this.numRows; row++) {
        this.cells[col][row] = [];
      }
    }
  }

  addParticles(particles) {
    particles.forEach((particle) => {
      const col = Math.floor(particle.posX / this.cellSize);
      const row = Math.floor(particle.posY / this.cellSize);
      this.cells[col][row].push(particle);
      particle.gridCell = { col, row };
    });
  }

  updateParticles(particles) {
    this.removeParticles(particles);
    this.addParticles(particles);
  }

  removeParticles(particles) {
    particles.forEach((particle) => {
      const { col, row } = particle.gridCell;
      const cell = this.cells[col][row];
      const index = cell.indexOf(particle);
      cell.splice(index, 1);
    });
  }

  getNeighbors(gridCell, distance) {
    const neighbors = [];
    const adjacentCellsToCheck = distance
      ? Math.ceil(distance / this.cellSize)
      : 1;

    for (
      let col = gridCell.col - adjacentCellsToCheck;
      col <= gridCell.col + adjacentCellsToCheck;
      col++
    ) {
      for (
        let row = gridCell.row - adjacentCellsToCheck;
        row <= gridCell.row + adjacentCellsToCheck;
        row++
      ) {
        if (col >= 0 && col < this.numCols && row >= 0 && row < this.numRows) {
          neighbors.push(...this.cells[col][row]);
        }
      }
    }
    return neighbors;
  }
}

export default Grid;
