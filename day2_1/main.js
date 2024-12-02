function main(input) {
  const args = input.split("\n");

  let count = 0;
  for (const current of args) {
    if (current === "") continue;

    const levels = current.split(" ").map(Number);

    let asc = true;
    if (levels[0] > levels[levels.length - 1]) {
      asc = false;
    }

    let safe = true;
    let prev = levels[0];
    for (let i = 1; i < levels.length; i++) {
      if (
        (asc && (prev >= levels[i] || levels[i] - prev > 3)) ||
        (!asc && (prev <= levels[i] || prev - levels[i] > 3))
      ) {
        safe = false;
        break;
      }
      prev = levels[i];
    }
    if (safe) {
      count++;
    }
  }
  console.log(count);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
