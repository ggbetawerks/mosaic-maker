import { TestBed } from '@angular/core/testing';

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
        const val = service.rgbAdd([255, 0, 0], [0, 255, 255]);
        expect(val).toEqual([255, 255, 255]);
      });

      it('should return values less than 256 for each component', () => {
        const val = service.rgbAdd([255, 255, 255], [255, 255, 255]);
        expect(val).toEqual([255, 255, 255]);
      });
    });

    describe('RGB Subtract', () => {
      it('should return a valid color', () => {
        const val = service.rgbSubtract([255, 0, 0], [255, 255, 255]);
        expect(val).toEqual([0, 0, 0]);
      });
      it('should return values greater than or equal to 0 for each component', () => {
        const val = service.rgbSubtract([0, 0, 0], [255, 255, 255]);
        expect(val).toEqual([0, 0, 0]);
      });
    });

    describe('RGB Multiply', () => {
      it('should return a valid color', () => {
        const val = service.rgbMultiply([255, 1, 1], 2);
        expect(val).toEqual([255, 2, 2]);
      });
      it('should return values less than 256 for each component', () => {
        const val = service.rgbMultiply([255, 255, 255], 2);
        expect(val).toEqual([255, 255, 255]);
      });
      it('should return values greater than or equal to 0 for each component', () => {
        const val = service.rgbMultiply([255, 255, 255], -2);
        expect(val).toEqual([0, 0, 0]);
      });
    });

    describe('RGB Distance', () => {
      it('should return a valid number', () => {
        const val = service.rgbDistance([255, 0, 0], [0, 255, 255]);
        expect(val).toBeDefined();
        expect(val).toBeGreaterThan(400);
      });
      it('should return a  number greater than or equal to 0', () => {
        const val = service.rgbDistance([0, 0, 0], [255, 255, 255]);
        expect(val).toBeDefined();
        expect(val).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
