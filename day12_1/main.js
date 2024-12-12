function main(input) {
  const args = input.split("\n");

  const graph = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "") continue;
    graph.push(args[i].split(""));
  }

  const H = graph.length;
  const W = graph[0].length;

  const move = [
    { x: -1, y: 0 }, // left
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // down
  ];

  let sum = 0;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (graph[y][x] === ".") continue;

      let outer = 0;
      let area = 0;
      let target = graph[y][x];
      const visited = new Set();
      (function search(cx, cy) {
        if (graph[cy][cx] !== target) {
          if (!visited.has(`${cx},${cy}`)) outer++;
          return;
        }

        visited.add(`${cx},${cy}`);
        area++;
        graph[cy][cx] = ".";

        for (const m of move) {
          const nx = cx + m.x;
          const ny = cy + m.y;

          if (nx < 0 || nx >= W || ny < 0 || ny >= H) {
            outer++;
            continue;
          }
          search(nx, ny);
        }
      })(x, y);
      sum += area * outer;
    }
  }
  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
