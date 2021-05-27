import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LegoColor } from '../models/color';
import { ColorListService } from '../services/color-list.service';
import { ColorUtilitiesService } from '../services/color-utilities.service';
import { Image, InterpolationAlgorithm } from 'image-js';
import { Point } from '../shared';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.page.html',
  styleUrls: ['./mosaic.page.scss'],
})
export class MosaicPage implements OnInit {
  sourceImageDataURL: string = null;

  croppedImageDataSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  // croppedImageDataURL: string;
  mosaicImageDataURL$: Observable<string>;
  mosaicPoints$: Observable<Point[]>;
  targetWidth = 48;
  targetHeight = 48;

  colorList$: Observable<LegoColor[]>;
  selectedColorList$: Observable<LegoColor[]>;

  backgroundColor: LegoColor = new LegoColor(
    [175, 181, 199, 255],
    'Light Bluish Grey',
    86
  );
  isTile = false;
  isRound = false;

  get ratio(): number {
    return this.targetWidth / this.targetHeight;
  }

  constructor(
    private colorUtil: ColorUtilitiesService,
    private colorList: ColorListService
  ) {}

  ngOnInit() {
    this.colorList$ = this.colorList.getColorList();
    this.selectedColorList$ = this.colorList.getSelectedColorList();

    const newImage = combineLatest([
      this.croppedImageDataSubject$,
      this.selectedColorList$,
    ]).pipe(
      switchMap(async ([image, colors]) => {
        return await this.resizeImage(image, colors);
      })
    );
    const justImage = newImage.pipe(
      switchMap(async ([image, points]) => {
        return image;
      })
    );
    const justPoints = newImage.pipe(
      switchMap(async ([image, points]) => {
        return points;
      })
    );

    this.mosaicImageDataURL$ = justImage;
    this.mosaicPoints$ = justPoints;
  }
  loadImageFromDevice(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.sourceImageDataURL = reader.result as string;
    };
  }

  startOver() {
    this.sourceImageDataURL = null;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageDataSubject$.next(event.base64);
  }

  async resizeImage(
    croppedImage: string,
    colors: LegoColor[]
  ): Promise<[string, Point[]]> {
    if (croppedImage.length > 0) {
      const cImage = await Image.load(croppedImage);
      const resized = cImage.resize({
        width: this.targetWidth,
        // interpolation: validInterpolations.nearestNeighbor,
      });

      const points = await this.algorithmNearestColor(resized, colors);

      return [resized.toDataURL(), points];
    }
    return ['', []];
  }

  private algorithmNearestColor(image: Image, colors: LegoColor[]) {
    const points: Point[] = [];
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = image.getPixelXY(x, y);
        const newColor = this.getClosestColorLab(
          colors,
          color[0],
          color[1],
          color[2]
        );

        points.push({ x, y, color: newColor });
        image.setPixelXY(x, y, [
          newColor.r,
          newColor.g,
          newColor.b,
          newColor.a,
        ]);
      }
    }
    return points;
  }

  private getClosestColor(
    colors: LegoColor[],
    red: number,
    green: number,
    blue: number
  ): LegoColor {
    let distance = 99999999;
    // let color = [0, 0, 0, 255];
    let legoColor: LegoColor;
    // console.log(colors);
    colors.forEach((element) => {
      if (element != null) {
        const newDistance = this.colorUtil.rgbDistance(
          { r: red, g: green, b: blue, a: 255 },
          element
        );

        if (newDistance < distance) {
          distance = newDistance;
          // color = [element.r, element.g, element.b, 255];
          legoColor = element;
        }
      }
    });

    return legoColor;
  }

  private getClosestColorLab(
    colors: LegoColor[],
    red: number,
    green: number,
    blue: number
  ): LegoColor {
    let distance = 99999999;
    // let color = [0, 0, 0, 255];
    let legoColor: LegoColor;
    // console.log(colors);
    colors.forEach((element) => {
      if (element != null) {
        const newDistance = this.colorUtil.labDistance(
          { r: red, g: green, b: blue, a: 255 },
          element
        );

        if (newDistance < distance) {
          distance = newDistance;
          // color = [element.r, element.g, element.b, 255];
          legoColor = element;
        }
      }
    });

    return legoColor;
  }
}
