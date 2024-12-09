function main(input) {
  const args = input.split("\n");
  const s = args[0];

  // ブロック化
  let id = 0;
  let isFile = true;
  const aryFileBlock = [];
  for (let c of s) {
    if (isFile) {
      aryFileBlock.push(...new Array(Number(c)).fill(id));
      id++;
    } else {
      aryFileBlock.push(...new Array(Number(c)).fill("."));
    }
    isFile = !isFile;
  }

  // 最適化
  let blank = 0;
  let file = aryFileBlock.length - 1;
  while (blank < file) {
    if (aryFileBlock[blank] !== ".") {
      blank++;
    }
    if (aryFileBlock[file] === ".") {
      file--;
    }
    if (aryFileBlock[blank] === "." && aryFileBlock[file] !== ".") {
      [aryFileBlock[blank], aryFileBlock[file]] = [
        aryFileBlock[file],
        aryFileBlock[blank],
      ];
      blank++;
      file--;
    }
  }

  // チェックサムの計算
  let sum = 0;
  for (let i = 0; i < aryFileBlock.length; i++) {
    if (aryFileBlock[i] !== ".") {
      sum += i * Number(aryFileBlock[i]);
    }
  }
  console.log(sum);
}

main(require("fs").readFileSync("./input/puzzle.txt", "utf8"));
