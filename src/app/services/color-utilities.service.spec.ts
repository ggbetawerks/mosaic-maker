import { TestBed } from '@angular/core/testing';
import { BasicColor } from '../models/color';

import { ColorUtilitiesService } from './color-utilities.service';

describe('ColorUtilitiesService', () => {
  let service: ColorUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('RGB Functions', () => {
    describe('RGB Add', () => {
      it('should return a valid color', () => {
        const val = service.rgbAdd(
          new BasicColor([255, 0, 0, 255]),
          new BasicColor([0, 255, 255, 255])
        );
        expect(val).toEqual(new BasicColor([255, 255, 255, 255]));
      });

      it('should return values less than 256 for each component', () => {
        const val = service.rgbAdd(
          new BasicColor([255, 255, 255, 255]),
          new BasicColor([255, 255, 255, 255])
        );
        expect(val).toEqual(new BasicColor([255, 255, 255, 255]));
      });
    });

    describe('RGB Subtract', () => {
      it('should return a valid color', () => {
        const val = service.rgbSubtract(
          new BasicColor([255, 0, 0, 255]),
          new BasicColor([255, 255, 255, 255])
        );
        expect(val).toEqual(new BasicColor([0, 0, 0, 255]));
      });
      it('should return values greater than or equal to 0 for each component', () => {
        const val = service.rgbSubtract(
          new BasicColor([0, 0, 0, 255]),
          new BasicColor([255, 255, 255, 255])
        );
        expect(val).toEqual(new BasicColor([0, 0, 0, 255]));
      });
    });

    describe('RGB Multiply', () => {
      it('should return a valid color', () => {
        const val = service.rgbMultiply(new BasicColor([255, 1, 1, 255]), 2);
        expect(val).toEqual(new BasicColor([255, 2, 2, 255]));
      });
      it('should return values less than 256 for each component', () => {
        const val = service.rgbMultiply(
          new BasicColor([255, 255, 255, 255]),
          2
        );
        expect(val).toEqual(new BasicColor([255, 255, 255, 255]));
      });
      it('should return values greater than or equal to 0 for each component', () => {
        const val = service.rgbMultiply(
          new BasicColor([255, 255, 255, 255]),
          -2
        );
        expect(val).toEqual(new BasicColor([0, 0, 0, 255]));
      });
    });

    describe('RGB Distance', () => {
      it('should return a valid number', () => {
        const val = service.rgbDistance(
          new BasicColor([255, 0, 0, 255]),
          new BasicColor([0, 255, 255, 255])
        );
        expect(val).toBeDefined();
        expect(val).toBeGreaterThan(400);
      });
      it('should return a  number greater than or equal to 0', () => {
        const val = service.rgbDistance(
          new BasicColor([0, 0, 0, 255]),
          new BasicColor([255, 255, 255, 255])
        );
        expect(val).toBeDefined();
        expect(val).toBeGreaterThanOrEqual(0);
      });
    });
  });
  describe('Lab Functions', () => {
    describe('RGB To XYZ', () => {
      it('should convert white to expected values', () => {
        const val = service.rgbToXyz(new BasicColor([255, 255, 255, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((95.05).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual((100.0).toPrecision(6));
        expect(val[2].toPrecision(6)).toEqual(
          (108.89999999999999).toPrecision(6)
        );
      });

      it('should convert black to expected values', () => {
        const val = service.rgbToXyz(new BasicColor([0, 0, 0, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((0).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual((0).toPrecision(6));
        expect(val[2].toPrecision(6)).toEqual((0).toPrecision(6));
      });

      it('should convert red to expected values', () => {
        const val = service.rgbToXyz(new BasicColor([255, 0, 0, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((41.24).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual((21.26).toPrecision(6));
        expect(val[2].toPrecision(6)).toEqual(
          (1.9300000000000002).toPrecision(6)
        );
      });

      it('should convert sand green to expected values', () => {
        const val = service.rgbToXyz(new BasicColor([118, 162, 144, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual(
          (25.42558533367896).toPrecision(6)
        );
        expect(val[1].toPrecision(6)).toEqual(
          (31.7058293051712).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (31.165323549892495).toPrecision(6)
        );
      });
    });

    describe('XYZ To Lab', () => {
      // Test values from http://colormine.org/color-converter
      it('should convert white XYZ to expected values', () => {
        const val = service.xyzToLab([95.05, 100.0, 108.89999999999999]);

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((100.0).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual(
          (0.00526049995830391).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (-0.010408184525267927).toPrecision(6)
        );
      });
      it('should convert black XYZ to expected values', () => {
        const val = service.xyzToLab([0, 0, 0]);

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((0).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual((0).toPrecision(6));
        expect(val[2].toPrecision(6)).toEqual((0).toPrecision(6));
      });

      it('should convert red XYZ to expected values', () => {
        const val = service.xyzToLab([41.24, 21.26, 1.9300000000000002]);

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual(
          (53.23288178584245).toPrecision(6)
        );
        expect(val[1].toPrecision(6)).toEqual(
          (80.10930952982204).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (67.22006831026425).toPrecision(6)
        );
      });

      it('should convert sand green XYZ to expected values', () => {
        const val = service.xyzToLab([
          25.42558533367896,
          31.7058293051712,
          31.165323549892495,
        ]);

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual(
          (63.099006424305955).toPrecision(6)
        );
        expect(val[1].toPrecision(6)).toEqual(
          (-18.777141524588203).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (4.57200118920571).toPrecision(6)
        );
      });
    });
    describe('RGB to Lab', () => {
      it('should convert white to expected values', () => {
        const val = service.rgbToLab(new BasicColor([255, 255, 255, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((100.0).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual(
          (0.00526049995830391).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (-0.010408184525267927).toPrecision(6)
        );
      });

      it('should convert black to expected values', () => {
        const val = service.rgbToLab(new BasicColor([0, 0, 0, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual((0).toPrecision(6));
        expect(val[1].toPrecision(6)).toEqual((0).toPrecision(6));
        expect(val[2].toPrecision(6)).toEqual((0).toPrecision(6));
      });

      it('should convert red to expected values', () => {
        const val = service.rgbToLab(new BasicColor([255, 0, 0, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual(
          (53.23288178584245).toPrecision(6)
        );
        expect(val[1].toPrecision(6)).toEqual(
          (80.10930952982204).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (67.22006831026425).toPrecision(6)
        );
      });

      it('should convert sand green to expected values', () => {
        const val = service.rgbToLab(new BasicColor([118, 162, 144, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual(
          (63.099006424305955).toPrecision(6)
        );
        expect(val[1].toPrecision(6)).toEqual(
          (-18.777141524588203).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (4.57200118920571).toPrecision(6)
        );
      });

      it('should convert dark bluish grey to expected values', () => {
        const val = service.rgbToLab(new BasicColor([89, 93, 96, 255]));

        expect(val).toBeTruthy();
        expect(val.length).toEqual(3);
        expect(val[0].toPrecision(6)).toEqual(
          (39.2365720380794).toPrecision(6)
        );
        expect(val[1].toPrecision(6)).toEqual(
          (-0.9067353899047115).toPrecision(6)
        );
        expect(val[2].toPrecision(6)).toEqual(
          (-2.2664540037550585).toPrecision(6)
        );
      });
    });

    describe('Lab Distance', () => {
      it('should return a valid number', () => {
        const val = service.labDistance(
          new BasicColor([255, 0, 0, 255]),
          new BasicColor([0, 255, 255, 255])
        );
        expect(val).toBeDefined();
        expect(val).toBeGreaterThan(100);
      });
      it('should return a  number greater than or equal to 0', () => {
        const val = service.labDistance(
          new BasicColor([0, 0, 0, 255]),
          new BasicColor([255, 255, 255, 255])
        );
        expect(val).toBeDefined();
        expect(val).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
