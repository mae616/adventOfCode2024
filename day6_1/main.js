function main(input) {
  const args = input.split("\n");

  const graph = [];
  for (const arg of args) {
    if (arg === "") continue;
    graph.push(arg.split(""));
  }

  const h = graph.length;
  const w = graph[0].length;

  const move = {
    top: { mark: "^", x: 0, y: -1, check: (x, y) => y > 0, turn: "right" },
    right: { mark: ">", x: 1, y: 0, check: (x, y) => x < w - 1, turn: "down" },
    down: { mark: "v", x: 0, y: 1, check: (x, y) => y < h - 1, turn: "left" },
    left: { mark: "<", x: -1, y: 0, check: (x, y) => x > 0, turn: "top" },
  };

  // ex. position = { x: 0, y: 0, direction: "down" };
  const position = (function () {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (graph[y][x] === "^") {
          return { x, y, direction: "top" };
        } else if (graph[y][x] === ">") {
          return { x, y, direction: "right" };
        } else if (graph[y][x] === "v") {
          return { x, y, direction: "down" };
        } else if (graph[y][x] === "<") {
          return { x, y, direction: "left" };
        }
      }
    }
  })();

  let count = 1;
  while (move[position.direction].check(position.x, position.y)) {
    if (
      graph[position.y][position.x] !== "X" &&
      graph[position.y][position.x] !== "#"
    ) {
      graph[position.y][position.x] = "X";
      count++;
    }

    const next = move[position.direction];
    const tempX = position.x + next.x;
    const tempY = position.y + next.y;

    if (graph[tempY][tempX] === "#") {
      position.direction = next.turn;
    } else {
      position.x = tempX;
      position.y = tempY;
    }
  }
  console.log(count);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
