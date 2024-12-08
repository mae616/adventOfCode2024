function main(input) {
  const args = input.split("\n");

  const test = [];
  const terms = [];
  for (const arg of args) {
    if (arg === "") continue;
    const [left, right] = arg.split(": ");
    test.push(Number(left));
    terms.push(right.split(" ").map(Number));
  }

  let sum = 0;
  for (let i = 0; i < test.length; i++) {
    const currentTerms = terms[i];
    const n = currentTerms.length;
    let cancel = false;
    (function recursion(index, total) {
      if (cancel) return;

      if (index === n) {
        if (total === test[i]) {
          sum += test[i];
          cancel = true;
        }
        return;
      }

      recursion(index + 1, total + currentTerms[index]);
      recursion(index + 1, total * currentTerms[index]);
      recursion(index + 1, Number(`${total}${currentTerms[index]}`));
    })(0, 0);
  }
  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
