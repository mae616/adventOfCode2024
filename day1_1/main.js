function main(input) {
  const args = input.split("\n");

  const a = [];
  const b = [];
  for (const arg of args) {
    if (arg === "") continue;
    const [tempA, tempB] = arg.split("   ");
    a.push(Number(tempA));
    b.push(Number(tempB));
  }

  a.sort((a, b) => a - b);
  b.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.abs(b[i] - a[i]);
  }

  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
