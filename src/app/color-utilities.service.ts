import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorUtilitiesService {
  constructor() {}

  public rgbAdd([r1, g1, b1]: number[], [r2, g2, b2]: number[]): number[] {
    return [
      this.clamp(r1 + r2, 255),
      this.clamp(g1 + g2, 255),
      this.clamp(b1 + b2, 255),
    ];
  }

  public rgbSubtract([r1, g1, b1]: number[], [r2, g2, b2]: number[]): number[] {
    return [
      this.clamp(r1 - r2, 255),
      this.clamp(g1 - g2, 255),
      this.clamp(b1 - b2, 255),
    ];
  }

  public rgbMultiply([r, g, b]: number[], value: number): number[] {
    return [
      this.clamp(r * value, 255),
      this.clamp(g * value, 255),
      this.clamp(b * value, 255),
    ];
  }

  public rgbDistance([r1, g1, b1]: number[], [r2, g2, b2]: number[]): number {
    return Math.sqrt(
      Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
    );
  }

  private clamp(val: number, max: number): number {
    return Math.max(0, Math.min(max, val));
  }
}
