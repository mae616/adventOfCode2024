const { count } = require("console");

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
    { label: "left", x: -1, y: 0 },
    { label: "up", x: 0, y: -1 },
    { label: "right", x: 1, y: 0 },
    { label: "down", x: 0, y: 1 },
  ];

  let sum = 0;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (graph[y][x] === ".") continue;

      let area = 0;
      let target = graph[y][x];
      const visited = new Set();
      const side = new Map();
      (function search(cx, cy, label) {
        if (graph[cy][cx] !== target) {
          if (label !== null && !visited.has(`${cx},${cy}`)) {
            saveOuter(label, side, cx, cy);
          }
          return;
        }

        visited.add(`${cx},${cy}`);
        area++;
        graph[cy][cx] = ".";

        for (const m of move) {
          const nx = cx + m.x;
          const ny = cy + m.y;

          if (nx < 0 || nx >= W || ny < 0 || ny >= H) {
            saveOuter(m.label, side, nx, ny);
            continue;
          }
          search(nx, ny, m.label);
        }
      })(x, y);
      let outer = countOuter(side);
      sum += area * outer;
    }
  }
  console.log(sum);
}
function saveOuter(label, side, x, y) {
  if (label === "up" || label === "down") {
    if (side.has(label)) {
      side.get(label).add(`${y}:${x}`);
    } else {
      side.set(label, new Set([`${y}:${x}`]));
    }
  } else {
    if (side.has(label)) {
      side.get(label).add(`${x}:${y}`);
    } else {
      side.set(label, new Set([`${x}:${y}`]));
    }
  }
}

function countOuter(side) {
  let outer = 0;
  for (const set of side.keys()) {
    const array = Array.from(side.get(set));
    array.sort((a, b) => {
      const [i, j] = a.split(":");
      const [k, l] = b.split(":");
      if (i === k) {
        return Number(j) - Number(l);
      } else {
        return Number(i) - Number(k);
      }
    });

    const temp = [];
    for (const current of array) {
      const [i, j] = current.split(":");
      if (!check(temp, Number(i), Number(j))) {
        outer++;
      }
      temp.push(current);
    }
  }
  return outer;
}

function check(ary, i, j) {
  const search = [`${i}:${j - 1}`, `${i}:${j + 1}`];
  for (const s of search) {
    if (ary.includes(s)) {
      return true;
    }
  }
  return false;
}
main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
