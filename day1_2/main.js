function main(input) {
  const args = input.split("\n");

  const a = [];
  const b = {};
  for (const arg of args) {
    if (arg === "") continue;
    const [tempA, tempB] = arg.split("   ");
    a.push(Number(tempA));

    if (tempB in b) {
      b[tempB]++;
    } else {
      b[tempB] = 1;
    }
  }

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] in b) {
      sum += a[i] * b[a[i]];
    }
  }

  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
