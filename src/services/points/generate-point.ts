import { Point } from '@/app/client-page';

export const generatePoint = (
  word: string = '',
  targetSize: number,
  screen: { width: number; height: number }
) => {
  const letters = word.trim().split('');
  const MAX_FAILS = 100;
  const MAX_LOOP_RETRY = 5;

  const [widthRange, heightRange] = [
    screen.width - targetSize,
    screen.height - targetSize,
  ];

  let stack: Point[] = [];
  let count = 0;
  let retry = 0;
  let index = 0;
  while (true) {
    if (count > MAX_FAILS) {
      if (retry > MAX_LOOP_RETRY) {
        break;
      }
      stack = [];
      count = 0;
      retry++;
    }

    if (stack.length === letters.length) {
      break;
    }

    const [randomX, randomY] = [
      Math.floor(Math.random() * widthRange) + targetSize / 2,
      Math.floor(Math.random() * heightRange) + targetSize / 2,
    ];
    let valid = true;
    for (const point of stack) {
      if (distance(point.x, point.y, randomX, randomY) < targetSize * 2) {
        count++;
        valid = false;
        break;
      }
    }
    if (valid) {
      count = 0;
      stack.push({
        index: index,
        value: letters[index],
        x: randomX,
        y: randomY,
      });
      index++;
    }
  }
  return stack;
};

const distance = (x1: number, y1: number, x2: number, y2: number) => {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
};
