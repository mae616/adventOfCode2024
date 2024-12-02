function main(input) {
  const args = input.split("\n");

  let count = 0;
  for (const current of args) {
    if (current === "") continue;

    const levels = current.split(" ").map(Number);

    const isSafe = (ary) => {
      let asc = true;
      if (ary[0] > ary[ary.length - 1]) {
        asc = false;
      }

      let safe = true;
      let prev = ary[0];
      for (let i = 1; i < ary.length; i++) {
        if (
          (asc && (prev >= ary[i] || ary[i] - prev > 3)) ||
          (!asc && (prev <= ary[i] || prev - ary[i] > 3))
        ) {
          safe = false;
          break;
        }
        prev = ary[i];
      }
      return safe;
    };

    if (isSafe(levels)) {
      count++;
    } else {
      for (let i = 0; i < levels.length; i++) {
        if (isSafe(levels.filter((_, index) => index !== i))) {
          count++;
          break;
        }
      }
    }
  }
  console.log(count);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
