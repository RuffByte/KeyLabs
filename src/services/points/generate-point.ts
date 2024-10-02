import { Point } from '@/app/client-page';
import { distance } from '../utils';

export const generatePoint = (
  word: string = '',
  targetSize: number,
  screen: { width: number; height: number }
) => {
  const letters = word.trim().split('');
  const zeroIndexLength = word.length - 1;
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
        index: zeroIndexLength - index,
        value: letters[index],
        x: randomX,
        y: randomY,
        key: zeroIndexLength - index,
      });
      index++;
    }
  }
  console.log(stack);
  return stack.reverse();
};
