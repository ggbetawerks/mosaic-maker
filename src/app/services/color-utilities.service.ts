import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { BasicColor } from '../models/color';

@Injectable({
  providedIn: 'root',
})
export class ColorUtilitiesService {
  constructor() {}

  public rgbAdd(color1: Color, color2: Color): Color {
    const [r1, g1, b1, a1] = color1.toRgb();
    const [r2, g2, b2] = color2.toRgb();
    return new BasicColor([
      this.clamp(r1 + r2, 255),
      this.clamp(g1 + g2, 255),
      this.clamp(b1 + b2, 255),
      this.clamp(a1, 255),
    ]);
  }

  public rgbSubtract(color1: Color, color2: Color): Color {
    const [r1, g1, b1, a1] = color1.toRgb();
    const [r2, g2, b2] = color2.toRgb();
    return new BasicColor([
      this.clamp(r1 - r2, 255),
      this.clamp(g1 - g2, 255),
      this.clamp(b1 - b2, 255),
      this.clamp(a1, 255),
    ]);
  }

  public rgbMultiply(color: Color, value: number): Color {
    const [r, g, b, a] = color.toRgb();
    return new BasicColor([
      this.clamp(r * value, 255),
      this.clamp(g * value, 255),
      this.clamp(b * value, 255),
      this.clamp(a, 255),
    ]);
  }

  public rgbDistance(color1: Color, color2: Color): number {
    const [r1, g1, b1] = color1.toRgb();
    const [r2, g2, b2] = color2.toRgb();
    return Math.sqrt(
      Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
    );
  }

  private clamp(val: number, max: number): number {
    return Math.max(0, Math.min(max, val));
  }
}
