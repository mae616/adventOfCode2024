function main(input) {
  const args = input.split("\n");

  const graph = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "") continue;
    graph.push(args[i].split(""));
  }

  const H = graph.length;
  const W = graph[0].length;

  // ありえるパターン
  const patterns = [
    [
      ["M", ".", "M"],
      [".", "A", "."],
      ["S", ".", "S"],
    ],
    [
      ["S", ".", "M"],
      [".", "A", "."],
      ["S", ".", "M"],
    ],
    [
      ["S", ".", "S"],
      [".", "A", "."],
      ["M", ".", "M"],
    ],
    [
      ["M", ".", "S"],
      [".", "A", "."],
      ["M", ".", "S"],
    ],
  ];
  const offset = { x: 1, y: 1 };

  const move = [
    // 斜め
    { x: -1, y: -1 }, // up left
    { x: 1, y: -1 }, // up right
    { x: -1, y: 1 }, // down left
    { x: 1, y: 1 }, // down right
  ];

  let count = 0;

  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (graph[y][x] !== "A") continue;

      for (const pattern of patterns) {
        let hit = true;
        for (const m of move) {
          const nx = x + m.x;
          const ny = y + m.y;

          const px = offset.x + m.x;
          const py = offset.y + m.y;

          if (graph[ny][nx] !== pattern[py][px]) {
            hit = false;
            break;
          }
        }
        if (hit) {
          count++;
          break;
        }
      }
    }
  }
  console.log(count);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
