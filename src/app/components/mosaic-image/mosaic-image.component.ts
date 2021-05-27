import { Component, Input, HostBinding } from '@angular/core';
import Image from 'image-js';
import { LegoColor } from 'src/app/models/color';
import { Point } from 'src/app/shared';
import { getBounds, createLinearScale } from '../../utils';

@Component({
  selector: 'app-mosaic-image',
  template: `
    <svg
      [attr.width]="imageWidth"
      [attr.height]="imageHeight"
      [style.left.px]="-margin"
      [style.top.px]="-margin"
      [style.background-color]="
        'rgba(' +
        background.r +
        ',' +
        background.g +
        ',' +
        background.b +
        ',' +
        background.a +
        ')'
      "
    >
      <svg:g
        app-mosaic-image-piece
        [width]="pieceWidth"
        [height]="pieceHeight"
        [points]="computedPoints"
        [isTile]="isTile"
        [isRound]="isRound"
      ></svg:g>
    </svg>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
      }

      svg {
        position: absolute;
      }
    `,
  ],
})
export class MosaicImageComponent {
  margin = 20;
  imageWidth = 500;
  imageHeight = 500;
  pieceWidth = 1;
  pieceHeight = 1;
  background: LegoColor = new LegoColor(
    [175, 181, 199, 255],
    'Light Bluish Grey',
    86
  );
  computedPoints: Point[];

  @Input() isTile: boolean;
  @Input() isRound: boolean;

  @HostBinding('style.width.px') get containerWidth() {
    return this.imageWidth - this.margin * 2;
  }

  @HostBinding('style.height.px') get containerHeight() {
    return this.imageHeight - this.margin * 2;
  }

  @Input() set width(width: number) {
    this.imageWidth = width;
  }
  @Input() set height(height: number) {
    this.imageHeight = height;
  }

  @Input() set backgroundColor(color: LegoColor) {
    this.background = color;
  }

  @Input() set points(points: Point[]) {
    const { margin, imageWidth, imageHeight } = this;
    if (points) {
      const bounds = getBounds(points);
      console.log(bounds);
      const scaleX = createLinearScale(
        [bounds.minX, bounds.maxX],
        [margin, imageWidth - margin]
      );
      const scaleY = createLinearScale(
        [bounds.minY, bounds.maxY],
        [margin, imageHeight - margin]
      );
      this.pieceWidth = scaleX(1) / 2;
      this.pieceHeight = scaleY(1) / 2;
      this.computedPoints = points.map((point) => {
        return {
          color: point.color,
          x: scaleX(point.x),
          y: scaleY(point.y),
        };
      });
      console.log(this.computedPoints);
    } else {
      this.computedPoints = [];
    }
  }
}
