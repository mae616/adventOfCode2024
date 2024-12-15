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

  // 10000000000000 を足す
  const add = 10000000000000;
  for (const claw of claws) {
    claw.prize.x += add;
    claw.prize.y += add;
  }

  // クレーンの操作
  const tokenA = 3; // Aボタンを1回押すのに消費するトークンの数
  const tokenB = 1; // Bボタンを1回押すのに消費するトークンの数

  let sum = 0;
  for (const claw of claws) {
    const { a, b, prize } = claw;

    // det(A) を求める
    const detA = a.x * b.y - a.y * b.x;

    if (detA === 0) {
      // クレーンが賞品に到達できない
      continue;
    }

    // ボタン A とボタン B を押す回数を求める
    const pushCountA = (b.y * prize.x + -1 * b.x * prize.y) / detA;
    const pushCountB = (-1 * a.y * prize.x + a.x * prize.y) / detA;

    // ボタン A とボタン B を押す回数が整数でない場合
    if (!Number.isInteger(pushCountA) || !Number.isInteger(pushCountB)) {
      // クレーンが賞品に到達できない
      continue;
    }

    // 最小のトークン数を求める
    const token = pushCountA * tokenA + pushCountB * tokenB;
    sum += token;
  }
  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
