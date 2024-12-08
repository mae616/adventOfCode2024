function main(input) {
  const args = input.split("\n");

  const map = [];
  for (const arg of args) {
    if (arg === "") continue;
    map.push(arg.split(""));
  }
  const h = map.length;
  const w = map[0].length;

  // 読み取り
  const antennas = {};
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (map[i][j] === ".") continue;

      if (map[i][j] in antennas) {
        antennas[map[i][j]].push([i, j]);
      } else {
        antennas[map[i][j]] = [[i, j]];
      }
    }
  }

  // アンチノードを探す
  const existing = new Set();
  for (const s of Object.keys(antennas)) {
    antinode(antennas[s], existing, h, w);
  }

  // for (const exist of existing) {
  //   const [y, x] = exist.split(",").map(Number);
  //   map[y][x] = "#";
  // }
  // console.table(map);

  console.log(existing.size);
}

function antinode(aryAntenna, existing, h, w) {
  const node = (x, a, b) => {
    let y = Math.round(a * x + b); // 端数は四捨五入

    if (0 <= x && x < w && 0 <= y && y < h) {
      existing.add(`${y},${x}`);
    }
  };

  for (let i = 0; i < aryAntenna.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const y1 = aryAntenna[j][0];
      const x1 = aryAntenna[j][1];
      const y2 = aryAntenna[i][0];
      const x2 = aryAntenna[i][1];

      const a = (y2 - y1) / (x2 - x1);
      const b = y1 - a * x1;

      node(x1 - (x2 - x1), a, b); // small
      node(x2 + (x2 - x1), a, b); // large
    }
  }
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
