export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
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
}

export class LegoColor implements Color {
  r: number;
  g: number;
  b: number;
  a: number;

  public bricklinkName: string;
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
}
