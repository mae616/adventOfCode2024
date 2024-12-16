function main(input) {
  const args = input.split("\n");

  const w = 101;
  const h = 103;
  const afterSeconds = 100;

  const wh = Math.trunc(w / 2);
  const hh = Math.trunc(h / 2);

  const sumArea = [
    { sum: 0, start: { x: 0, y: 0 }, end: { x: wh - 1, y: hh - 1 } },
    { sum: 0, start: { x: wh + 1, y: 0 }, end: { x: w - 1, y: hh - 1 } },
    { sum: 0, start: { x: 0, y: hh + 1 }, end: { x: wh - 1, y: h - 1 } },
    { sum: 0, start: { x: wh + 1, y: hh + 1 }, end: { x: w - 1, y: h - 1 } },
  ];

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

  // 安全係数を求める
  for (const robot of robots) {
    let x = (robot.position.x + robot.move.x * afterSeconds) % w;
    let y = (robot.position.y + robot.move.y * afterSeconds) % h;
    if (x < 0) x += w;
    if (y < 0) y += h;

    for (const area of sumArea) {
      if (
        area.start.x <= x &&
        x <= area.end.x &&
        area.start.y <= y &&
        y <= area.end.y
      ) {
        area.sum++;
      }
    }
  }
  console.log(sumArea.reduce((prev, current) => prev * current.sum, 1));
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
