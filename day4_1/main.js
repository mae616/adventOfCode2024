function main(input) {
  const args = input.split("\n");

  const target = "XMAS";
  const graph = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "") continue;
    graph.push(args[i].split(""));
  }

  const H = graph.length;
  const W = graph[0].length;

  const move = [
    { check: (cx, cy) => cx > 0, x: -1, y: 0 }, // left
    { check: (cx, cy) => cy > 0, x: 0, y: -1 }, // up
    { check: (cx, cy) => cx < W - 1, x: 1, y: 0 }, // right
    { check: (cx, cy) => cy < H - 1, x: 0, y: 1 }, // down

    // 斜め
    { check: (cx, cy) => cx > 0 && cy > 0, x: -1, y: -1 }, // up left
    { check: (cx, cy) => cx < W - 1 && cy > 0, x: 1, y: -1 }, // up right
    { check: (cx, cy) => cx > 0 && cy < H - 1, x: -1, y: 1 }, // down left
    { check: (cx, cy) => cx < W - 1 && cy < H - 1, x: 1, y: 1 }, // down right
  ];

  let count = 0;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      (function search(cx, cy, index, pattern) {
        if (graph[cy][cx] !== target[index]) return;

        if (index === target.length - 1) {
          count++;
          return;
        }

        if (pattern === null) {
          for (const m of move) {
            if (!m.check(cx, cy)) continue;
            const nx = cx + m.x;
            const ny = cy + m.y;

            search(nx, ny, index + 1, m);
          }
        } else {
          if (!pattern.check(cx, cy)) return;
          const nx = cx + pattern.x;
          const ny = cy + pattern.y;

          search(nx, ny, index + 1, pattern);
        }
      })(x, y, 0, null);
    }
  }
  console.log(count);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
