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

    const queue = [{ x: 0, y: 0 }];
    const point = new Array(prize.x + 1)
      .fill()
      .map(() => new Array(prize.y + 1).fill(Infinity));
    while (queue.some((p) => p.x < prize.x || p.y < prize.y)) {
      const { x, y } = queue.shift();

      if (x > prize.x || y > prize.y) {
        continue;
      }

      point[x + a.x][y + a.y] = Math.min(
        point[x + a.x][y + a.y],
        point[x][y] + tokenA
      );
      point[x + b.x][y + b.y] = Math.min(
        point[x + b.x][y + b.y],
        point[x][y] + tokenB
      );

      queue.push({ x: x + a.x, y: y + a.y });
      queue.push({ x: x + b.x, y: y + b.y });
    }

    // トークンの消費量
    if (point[prize.x][prize.y] !== Infinity) {
      sum += point[prize.x][prize.y];
    }
  }
  console.log(sum);
}
main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
