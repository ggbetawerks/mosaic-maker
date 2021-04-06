import { Injectable } from '@angular/core';
import Decimal from 'decimal.js';
import { Color } from '../models/color';
import { BasicColor } from '../models/color';
Decimal.set({ precision: 10 });
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

  public rgbToXyz(color: Color): Decimal[] {
    const r = this.pivotRgb(color.r / 255.0);
    const g = this.pivotRgb(color.g / 255.0);
    const b = this.pivotRgb(color.b / 255.0);

    // Observer. = 2°, Illuminant = D65
    const X = r
      .times(0.4124)
      .plus(g.times(0.3576))
      .plus(b.times(0.1805))
      .times(100);
    const Y = r
      .times(0.2126)
      .plus(g.times(0.7152))
      .plus(b.times(0.0722))
      .times(100);
    const Z = r
      .times(0.0193)
      .plus(g.times(0.1192))
      .plus(b.times(0.9505))
      .times(100);

    return [X, Y, Z];
  }

  public xyzToLab([X, Y, Z]: Decimal[]): Decimal[] {
    const REF_X = 95.047; // Observer= 2°, Illuminant= D65
    const REF_Y = 100.0;
    const REF_Z = 108.883;

    const x = this.pivotXyz(X.div(REF_X));
    const y = this.pivotXyz(Y.div(REF_Y));
    const z = this.pivotXyz(Z.div(REF_Z));

    const L = y.times(116).minus(16);
    const a = x.minus(y).times(500);
    const b = y.minus(z).times(200);

    return [L, a, b];
  }
  public rgbToLab(color: Color): Decimal[] {
    // Formulas from https://github.com/colormine/colormine
    // First convert to XYZ
    const xyz = this.rgbToXyz(color);
    // Then to L*ab
    return this.xyzToLab(xyz);
  }

  private pivotRgb(n: number): Decimal {
    const val = new Decimal(n);
    return val.greaterThan(0.04045)
      ? val.plus(0.055).div(1.055).pow(2.4)
      : val.div(12.92).times(100);
  }

  private pivotXyz(n: Decimal): Decimal {
    const i = n.cubeRoot();
    const sixteenOneSixteenth = new Decimal(16).div(116);
    return n.greaterThan(0.008856)
      ? i
      : n.times(7.787).plus(sixteenOneSixteenth);
  }
}
