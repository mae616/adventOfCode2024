function main(input) {
  const args = input.split("\n");

  let count = 0;
  for (const current of args) {
    if (current === "") continue;

    const levels = current.split(" ").map(Number);

    const isAsc = () => {
      let ascCount = 0;
      let descCount = 0;
      let prev = levels[0];
      for (let i = 1; i < levels.length; i++) {
        if (prev < levels[i]) {
          ascCount++;
        } else if (prev > levels[i]) {
          descCount++;
        }
        prev = levels[i];
      }
      return ascCount >= descCount; // 修正: 同数の場合も昇順とみなす
    };

    let asc = isAsc();

    const isSafe = (ary, asc) => {
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

    if (isSafe(levels, asc)) {
      count++;
    } else {
      for (let i = 0; i < levels.length; i++) {
        if (
          isSafe(
            levels.filter((_, index) => index !== i),
            asc
          )
        ) {
          count++;
          break;
        }
      }
    }
  }
  console.log(count);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
