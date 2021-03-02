export interface Color {
  toRgb(): number[];
  toLab(): number[];
}

export class BasicColor implements Color {
  r: number;
  g: number;
  b: number;
  a: number;

  public constructor([r, g, b, a]: number[]) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  toRgb(): number[] {
    return [this.r, this.g, this.b, this.a];
  }
  toLab(): number[] {
    throw new Error('Method not implemented.');
  }
}

export class LegoColor implements Color {
  r: number;
  g: number;
  b: number;
  a: number;

  bricklinkName: string;
  bricklinkId: number;

  legoName: string;
  legoId: number;

  public constructor(
    [r, g, b, a]: number[],
    bricklinkName: string,
    bricklinkId: number,
    legoName?: string,
    legoId?: number
  ) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.bricklinkId = bricklinkId;
    this.bricklinkName = bricklinkName;
    this.legoId = legoId;
    this.legoName = legoName;
  }

  toRgb(): number[] {
    return [this.r, this.g, this.b, this.a];
  }
  toLab(): number[] {
    throw new Error('Method not implemented.');
  }
}
