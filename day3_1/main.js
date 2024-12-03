function main(input) {
  const programs = input.split("\n");

  let sum = 0;
  for (const program of programs) {
    if (program === "") continue;

    const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;
    const matches = program.match(regex);

    if (matches !== null) {
      for (const match of matches) {
        const strNum = match.match(/\d{1,3}/g);
        sum += Number(strNum[0]) * Number(strNum[1]);
      }
    }
  }
  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
