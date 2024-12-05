function main(input) {
  const args = input.split("\n");

  const rules = [];
  const prints = [];
  for (const arg of args) {
    if (arg === "") continue;
    if (arg.includes("|")) {
      rules.push(arg.split("|").map(Number));
    } else if (arg.includes(",")) {
      prints.push(arg.split(",").map(Number));
    }
  }

  let sum = 0;
  for (const print of prints) {
    let hit = true;
    for (const rule of rules) {
      let index = 0;
      for (const r of rule) {
        if (!print.includes(r)) {
          break;
        }

        if (!print.includes(r, index)) {
          hit = false;
          break;
        }
        index = print.indexOf(r, index);
      }

      if (!hit) {
        break;
      }
    }

    if (hit) {
      const mid = Math.trunc(print.length / 2);
      sum += print[mid];
    }
  }
  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
