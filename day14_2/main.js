const clivas = require("clivas");
const keypress = require("keypress");

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

const w = 101;
const h = 103;
clivas.cursor(false);
clivas.pin(h + 1);

function main(input) {
  const args = input.split("\n");

  let afterSeconds = 110607;

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

  const draw = () => {
    clivas.clear();

    const grids = new Array(h)
      .fill()
      .map(() => new Array(w).fill().map(() => "{2}"));
    for (const robot of robots) {
      let x = (robot.position.x + robot.move.x * afterSeconds) % w;
      let y = (robot.position.y + robot.move.y * afterSeconds) % h;
      if (x < 0) x += w;
      if (y < 0) y += h;
      grids[y][x] = "{2+green:■}";
    }
    for (const grid of grids) {
      clivas.line(grid.join(""));
    }
    clivas.line(`seconds: ${afterSeconds}`);
  };
  // キーボードでのキーを押した時
  process.stdin.on("keypress", (ch, key) => {
    // ctrl + c でゲームを終了させられるようにする
    if (key && key.ctrl && key.name === "c") {
      process.exit();
    }
    if (key.name === "up") {
      // move up
      afterSeconds += 100;
    }
    if (key.name === "left") {
      // move left
      afterSeconds--;
    }
    if (key.name === "down") {
      // move down
      afterSeconds -= 100;
    }
    if (key.name === "right") {
      // move right
      afterSeconds++;
    }
    draw();
  });

  draw();
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
