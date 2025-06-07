export function dfs(grid, start) {
  const stack = [start];
  const visited = [];
  const seen = new Set();
  seen.add(`${start.row}-${start.col}`);

  while (stack.length) {
    const { row, col } = stack.pop();
    visited.push({ row, col });

    for (const [dx, dy] of [
      [0, 1], [1, 0], [0, -1], [-1, 0],
    ]) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[0].length &&
        !seen.has(`${newRow}-${newCol}`) &&
        !grid[newRow][newCol].isWall
      ) {
        stack.push({ row: newRow, col: newCol });
        seen.add(`${newRow}-${newCol}`);
      }
    }
  }

  return visited;
}