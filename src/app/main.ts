import p5, { Color } from "p5";

export const sketch = (p5: p5): void => {
  const CELL_SIZE = 4;
  const CELL_NUM = 150;

  const CELL_COLOR: Color[] = [
    p5.color("#FFFBDE"),
    p5.color("#97F9F9"),
    p5.color("#A4DEF9"),
    p5.color("#C1E0F7"),
    p5.color("#CFBAE1"),
    p5.color("#C59FC9"),
  ];

  const MOD = CELL_COLOR.length;

  let cells: number[][];
  let pause: boolean;

  p5.setup = () => {
    const size = CELL_SIZE * CELL_NUM;
    p5.createCanvas(size, size);

    p5.frameRate(4);
    initialize();
  };

  p5.draw = () => {
    if (pause) return;
    drawCells();
    updateCells();
  };

  p5.keyPressed = () => {
    if (p5.keyCode === p5.ENTER) {
      pause = !pause;
    }
  };

  const initialize = () => {
    cells = createTwoDimArray(CELL_NUM, CELL_NUM, 0);
    cells[CELL_NUM / 2][CELL_NUM / 2] = 1;
    cells[CELL_NUM / 2 + 1][CELL_NUM / 2] = 1;
    cells[CELL_NUM / 2][CELL_NUM / 2 + 1] = 1;
    cells[CELL_NUM / 2 + 1][CELL_NUM / 2 + 1] = 1;
    // console.log("init");
  };

  const createTwoDimArray = <T>(size1: number, size2: number, fill: T): T[][] => {
    return Array.from(Array(size1)).map(() => Array<T>(size2).fill(fill));
  };

  const drawCells = () => {
    for (let x = 0; x < CELL_NUM; x++) {
      for (let y = 0; y < CELL_NUM; y++) {
        const cell = cells[x][y];
        const color = CELL_COLOR[cell];
        p5.noStroke();
        p5.fill(color);
        p5.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  };

  const updateCells = () => {
    const next = createTwoDimArray(CELL_NUM, CELL_NUM, 0);
    for (let x = 0; x < CELL_NUM; x++) {
      for (let y = 0; y < CELL_NUM; y++) {
        next[x][y] = updateRule(x, y);
        // console.log(cells[x][y]);
      }
    }
    cells = next;
    // console.log(cells);
  };

  const updateRule = (x: number, y: number): number => {
    const refCells = [
      cells[circularIndex(x)][circularIndex(y)],
      cells[circularIndex(x - 1)][circularIndex(y)],
      cells[circularIndex(x + 1)][circularIndex(y)],
      cells[circularIndex(x)][circularIndex(y - 1)],
      cells[circularIndex(x)][circularIndex(y + 1)],
    ];

    return refCells.reduce((sum, next) => sum + next, 0) % MOD;
  };

  const circularIndex = (i: number) => (i + CELL_NUM) % CELL_NUM;
};
