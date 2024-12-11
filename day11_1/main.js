function main(input) {
  const args = input.split("\n");
  let stones = args[0].split(" ").map(Number);

  const blink = 25;
  for (let i = 0; i < blink; i++) {
    stones = stones.flatMap((current) => {
      if (current === 0) {
        return 1;
      } else if (`${current}`.length % 2 === 0) {
        const half = `${current}`.length / 2;
        return [
          Number(`${current}`.slice(0, half)),
          Number(`${current}`.slice(half)),
        ];
      } else {
        return current * 2024;
      }
    });
  }
  console.log(stones.length);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
