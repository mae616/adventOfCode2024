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
  let prevIndex = aryFileBlock.length - 1;
  let fileCount = 1;
  // 右端からfileを探す
  for (let i = aryFileBlock.length - 2; i >= 0; i--) {
    if (aryFileBlock[prevIndex] === ".") {
      prevIndex = i;
      fileCount = 1;
      continue;
    }
    if (aryFileBlock[prevIndex] === aryFileBlock[i]) {
      fileCount++;
      continue;
    }
    // 左端から空き容量を探す
    let start = 0;
    let blankCount = 0;
    for (let j = 0; j < prevIndex; j++) {
      if (aryFileBlock[j] !== ".") {
        start = j + 1;
        blankCount = 0;
        continue;
      }
      blankCount++;

      if (blankCount === fileCount) {
        const fileId = aryFileBlock[prevIndex];
        for (let k = 0; k < fileCount; k++) {
          aryFileBlock[start + k] = fileId;
          aryFileBlock[prevIndex - k] = ".";
        }
        break;
      }
    }
    prevIndex = i;
    fileCount = 1;
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
