import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LegoColor } from '../models/color';
import { ColorListService } from '../services/color-list.service';
import { ColorUtilitiesService } from '../services/color-utilities.service';
import { Image, InterpolationAlgorithm } from 'image-js';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.page.html',
  styleUrls: ['./mosaic.page.scss'],
})
export class MosaicPage implements OnInit {
  sourceImageDataURL: string;

  croppedImageDataSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  // croppedImageDataURL: string;
  mosaicImageDataURL$: Observable<string>;
  targetWidth = 48;
  targetHeight = 48;

  colorList$: Observable<LegoColor[]>;
  selectedColorList$: Observable<LegoColor[]>;

  get ratio(): number {
    return this.targetWidth / this.targetHeight;
  }

  constructor(
    private colorUtil: ColorUtilitiesService,
    private colorList: ColorListService
  ) {
    this.colorList$ = colorList.getColorList();
    this.selectedColorList$ = colorList.getSelectedColorList();

    const z = combineLatest([
      this.croppedImageDataSubject$,
      this.selectedColorList$,
    ]).pipe(
      switchMap(async ([image, colors]) => {
        return await this.resizeImage(image, colors);
      })
    );
    this.mosaicImageDataURL$ = z;
  }

  ngOnInit() {}
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

  async resizeImage(croppedImage: string, colors: LegoColor[]) {
    if (croppedImage.length > 0) {
      const cImage = await Image.load(croppedImage);
      const resized = cImage.resize({
        width: this.targetWidth,
        // interpolation: validInterpolations.nearestneighbor,
      });

      await this.algorithmNearestColor(resized, colors);

      return resized.toDataURL();
    }
    return '';
  }

  private algorithmNearestColor(image: Image, colors: LegoColor[]) {
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        const color = image.getPixelXY(x, y);
        const newColor = this.getClosestColor(
          colors,
          color[0],
          color[1],
          color[2]
        );
        image.setPixelXY(x, y, newColor);
      }
    }
  }

  private getClosestColor(
    colors: LegoColor[],
    red: number,
    green: number,
    blue: number
  ): number[] {
    let distance = 99999999;
    let color = [0, 0, 0, 255];
    // console.log(colors);
    colors.forEach((element) => {
      if (element != null) {
        const newDistance = Math.sqrt(
          Math.pow(red - element.r, 2) +
            Math.pow(green - element.g, 2) +
            Math.pow(blue - element.b, 2)
        );

        /*const newDistance =
        Math.abs(red - element.r) +
        Math.abs(green - element.g) +
        Math.abs(blue - element.b);*/
        if (newDistance < distance) {
          distance = newDistance;
          color = [element.r, element.g, element.b, 255];
        }
      }
    });

    return color;
  }
}
