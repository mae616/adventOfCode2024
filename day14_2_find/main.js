function main(input) {
  const args = input.split("\n");

  const w = 101;
  const h = 103;
  let afterSeconds = 1;
  let exampleTreeSeconds = 110607;

  // 読み込み
  const robots = [];
  for (const arg of args) {
    if (arg === "") continue;
    const [px, py, mx, my] = arg.match(/-?\d+/g).map(Number);
    robots.push({
      position: { x: px, y: py },
      move: { x: mx, y: my },
    });
  }

  const draw = (second) => {
    const grids = new Array(h)
      .fill()
      .map(() => new Array(w).fill().map(() => "."));
    for (const robot of robots) {
      let x = (robot.position.x + robot.move.x * second) % w;
      let y = (robot.position.y + robot.move.y * second) % h;
      if (x < 0) x += w;
      if (y < 0) y += h;
      grids[y][x] = "■";
    }

    const s = [];
    for (const grid of grids) {
      s.push(grid.join(""));
    }
    return s;
  };

  const isTree = draw(exampleTreeSeconds);
  let view = [];
  while (view.length === 0 || view.join("") !== isTree.join("")) {
    view = draw(afterSeconds);
    afterSeconds++;
  }
  console.log(afterSeconds - 1);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
