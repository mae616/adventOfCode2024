function main(input) {
  const args = input.split("\n");

  // 読み込みと解析
  const claws = [];

  const clawMapping = [
    { prefix: "Button A", key: "a" },
    { prefix: "Button B", key: "b" },
    { prefix: "Prize", key: "prize" },
  ];

  let clawCount = 0;
  let claw = {};
  for (const arg of args) {
    if (arg === "") {
      claws.push(claw);
      clawCount++;
      claw = {};
      continue;
    }

    const [prefix, value] = arg.split(": ");
    const mapping = clawMapping.find((m) => prefix === m.prefix);
    const [x, y] = value.match(/\d+/g);
    claw[mapping.key] = { x: parseInt(x), y: parseInt(y) };
  }

  // クレーンの操作
  const tokenA = 3; // Aボタンを1回押すのに消費するトークンの数
  const tokenB = 1; // Bボタンを1回押すのに消費するトークンの数

  let sum = 0;
  for (const claw of claws) {
    const { a, b, prize } = claw;

    let minToken = Infinity;
    for (let countB = 0; countB <= 100; countB++) {
      for (let countA = 0; countA <= 100; countA++) {
        if (
          countA * a.x + countB * b.x === prize.x &&
          countA * a.y + countB * b.y === prize.y
        ) {
          minToken = Math.min(minToken, countA * tokenA + countB * tokenB);
        }
      }
    }

    // トークンの消費量
    if (minToken !== Infinity) {
      sum += minToken;
    }
  }
  console.log(sum);
}
main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
