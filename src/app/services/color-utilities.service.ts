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

  public rgbToXyz(color: Color): number[] {
    const r = this.pivotRgb(color.r / 255.0);
    const g = this.pivotRgb(color.g / 255.0);
    const b = this.pivotRgb(color.b / 255.0);

    // Observer. = 2°, Illuminant = D65
    return [
      r * 0.4124 + g * 0.3576 + b * 0.1805,
      r * 0.2126 + g * 0.7152 + b * 0.0722,
      r * 0.0193 + g * 0.1192 + b * 0.9505,
    ];
  }

  public xyzToLab([X, Y, Z]: number[]): number[] {
    const REF_X = 95.047; // Observer= 2°, Illuminant= D65
    const REF_Y = 100.0;
    const REF_Z = 108.883;

    const x = this.pivotXyz(X / REF_X);
    const y = this.pivotXyz(Y / REF_Y);
    const z = this.pivotXyz(Z / REF_Z);

    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  }

  public rgbToLab(color: Color): number[] {
    // Formulas from https://github.com/colormine/colormine
    // First convert to XYZ
    const xyz = this.rgbToXyz(color);
    // Then to L*ab
    const lab = this.xyzToLab(xyz);

    return lab;
  }

  public labDistance(color1: Color, color2: Color): number {
    const color1Lab = this.rgbToLab(color1);
    const color2Lab = this.rgbToLab(color2);

    return Math.sqrt(
      Math.pow(color1Lab[0] - color2Lab[0], 2) +
        Math.pow(color1Lab[1] - color2Lab[1], 2) +
        Math.pow(color1Lab[2] - color2Lab[2], 2)
    );
  }

  private pivotRgb(n: number): number {
    return (n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92) * 100;
  }

  private pivotXyz(n: number): number {
    const i = Math.cbrt(n);
    return n > 0.008856 ? i : 7.787 * n + 16 / 116;
  }
}
