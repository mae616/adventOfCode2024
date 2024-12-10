function main(input) {
  const args = input.split("\n");

  const graph = [];
  for (const arg of args) {
    if (arg === "") continue;
    graph.push(arg.split("").map(Number));
  }

  const h = graph.length;
  const w = graph[0].length;

  const hiking = {
    top: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
  };

  const score = new Set();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (graph[y][x] !== 0) continue;

      (function bfs(cy, cx, nextScore, strRoute) {
        for (const key of Object.keys(hiking)) {
          const ny = cy + hiking[key].y;
          const nx = cx + hiking[key].x;

          if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
          if (graph[ny][nx] !== nextScore) continue;

          if (nextScore === 9) {
            score.add(`${strRoute}|${ny}:${nx}`);
            continue;
          }
          bfs(ny, nx, nextScore + 1, `${strRoute}|${ny}:${nx}`);
        }
      })(y, x, 1, `${y}:${x}`);
    }
  }
  console.log(score.size);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
