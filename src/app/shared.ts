import { LegoColor } from './models/color';

export type Point = {
  x: number;
  y: number;
  color: LegoColor;
};

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
