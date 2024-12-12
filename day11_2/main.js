const MAX_ARRAY_LENGTH = 2 ^ (32 - 1);
function main(input) {
  const args = input.split("\n");
  let stones = args[0].split(" ").map(Number);

  let sum = 0;
  const blink = 75;
  const memo = new Map();
  for (const stone of stones) {
    sum += countStone(stone, 0, blink, memo);
  }
  console.log(sum);
}

function countStone(stone, start, blink, memo) {
  const key = `${stone}-${start}`;
  if (memo.has(key)) return memo.get(key);

  let sum = 1;
  let currentStones = [stone];

  for (let i = start; i < blink; i++) {
    const nextStones = [];
    const temp = [];
    for (const current of currentStones) {
      const currentStr = `${current}`;
      if (current === 0) {
        nextStones.push(1);
      } else if (currentStr.length % 2 === 0) {
        const half = currentStr.length / 2;
        if (nextStones.length >= MAX_ARRAY_LENGTH - 1) {
          nextStones.push(Number(currentStr.slice(0, half)));
          temp.push(Number(currentStr.slice(half)));
        } else {
          nextStones.push(Number(currentStr.slice(0, half)));
          nextStones.push(Number(currentStr.slice(half)));
          sum++;
        }
      } else {
        nextStones.push(current * 2024);
      }
    }
    for (const t of temp) {
      sum += countStone(t, i + 1, blink, memo);
    }
    currentStones = nextStones;
  }
  memo.set(key, sum);
  return sum;
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
