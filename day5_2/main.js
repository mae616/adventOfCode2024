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
    if (!passRule(print, rules)) {
      const newPrint = sortAgain(print, rules);
      const mid = Math.trunc(newPrint.length / 2);
      sum += newPrint[mid];
    }
  }
  console.log(sum);
}

function passRule(print, rules) {
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
  return hit;
}

function sortAgain(arr, rules) {
  let result = [...arr];
  while (!passRule(result, rules)) {
    for (const rule of rules) {
      let index = 0;
      for (const r of rule) {
        if (!result.includes(r)) {
          break;
        }

        if (!result.includes(r, index)) {
          const i = result.indexOf(r);
          const temp = result[i];
          result = [...result.slice(0, i), ...result.slice(i + 1), temp];
        }
        index = result.indexOf(r, index);
      }
    }
  }
  return result;
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
