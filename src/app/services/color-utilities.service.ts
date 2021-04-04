import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { BasicColor } from '../models/color';

@Injectable({
  providedIn: 'root',
})
export class ColorUtilitiesService {
  constructor() {}

  public rgbAdd(color1: Color, color2: Color): Color {
    return new BasicColor([
      this.clamp(color1.r + color2.r, 255),
      this.clamp(color1.g + color2.g, 255),
      this.clamp(color1.b + color2.b, 255),
      this.clamp(color1.a, 255),
    ]);
  }

  public rgbSubtract(color1: Color, color2: Color): Color {
    return new BasicColor([
      this.clamp(color1.r - color2.r, 255),
      this.clamp(color1.g - color2.g, 255),
      this.clamp(color2.g - color2.b, 255),
      this.clamp(color1.a, 255),
    ]);
  }

  public rgbMultiply(color: Color, value: number): Color {
    return new BasicColor([
      this.clamp(color.r * value, 255),
      this.clamp(color.g * value, 255),
      this.clamp(color.b * value, 255),
      this.clamp(color.a, 255),
    ]);
  }

  public rgbDistance(color1: Color, color2: Color): number {
    return Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
  }

  private clamp(val: number, max: number): number {
    return Math.max(0, Math.min(max, val));
  }
}
