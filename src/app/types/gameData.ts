import { string } from 'zod';

export type GameData = {
  mode: string;
  language: string;
  totalTime: number;
  totalChar: number;
  totalClick: number;
  totalHit: number;
  targetSize: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  userName?: string;
};
