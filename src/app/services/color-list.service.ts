import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { LegoColor } from '../models/color';

export interface ColorListState {
  providedColors: LegoColor[];
  customColors: LegoColor[];
  selectedColors: LegoColor[];
}

export enum ColorListStoreActions {
  Initialize = 'INIT_COLOR_STATE',
  AddColor = 'ADD_COLOR',
  RemoveColor = 'REMOVE_COLOR',
}

@Injectable({
  providedIn: 'root',
})
export class ColorListService extends ObservableStore<ColorListState> {
  constructor() {
    const initialState: ColorListState = {
      customColors: [],
      selectedColors: [],
      providedColors: [
        // Current 2021 active solid colors per Bricklink
        new LegoColor([255, 255, 255, 255], 'White', 1),
        new LegoColor([175, 181, 199, 255], 'Light Bluish Grey', 86),
        new LegoColor([89, 93, 96, 255], 'Dark Bluish Grey', 85),
        new LegoColor([33, 33, 33, 255], 'Black', 11),
        new LegoColor([106, 14, 21, 255], 'Dark Red', 59),
        new LegoColor([179, 0, 6, 255], 'Red', 5),
        new LegoColor([255, 99, 71, 255], 'Coral', 220),
        new LegoColor([137, 53, 29, 255], 'Reddish Brown', 88),
        new LegoColor([51, 0, 0, 255], 'Dark Brown', 120),
        new LegoColor([144, 116, 80, 255], 'Dark Tan', 69),
        new LegoColor([222, 198, 156, 255], 'Tan', 2),
        new LegoColor([254, 204, 176, 255], 'Light Nougat', 90),
        new LegoColor([255, 175, 125, 255], 'Nougat', 28),
        new LegoColor([227, 160, 91, 255], 'Medium Nougat', 150),
        new LegoColor([179, 84, 8, 255], 'Dark Orange', 68),
        new LegoColor([255, 126, 20, 255], 'Orange', 4),
        new LegoColor([247, 186, 48, 255], 'Bright Light Orange', 110),
        new LegoColor([247, 209, 23, 255], 'Yellow', 3),
        new LegoColor([243, 224, 85, 255], 'Bright Light Yellow', 103),
        new LegoColor([223, 238, 165, 255], 'Yellowish Green', 158),
        new LegoColor([166, 202, 85, 255], 'Lime', 34),
        new LegoColor([125, 144, 81, 255], 'Olive Green', 155),
        new LegoColor([46, 85, 67, 255], 'Dark Green', 80),
        new LegoColor([0, 100, 46, 255], 'Green', 6),
        new LegoColor([16, 203, 49, 255], 'Bright Green', 36),
        new LegoColor([118, 162, 144, 255], 'Sand Green', 48),
        new LegoColor([0, 138, 128, 255], 'Dark Turquoise', 39),
        new LegoColor([204, 255, 255, 255], 'Light Aqua', 152),
        new LegoColor([20, 48, 68, 255], 'Dark Blue', 63),
        new LegoColor([0, 87, 166, 255], 'Blue', 7),
        new LegoColor([51, 153, 255, 255], 'Dark Azure', 153),
        new LegoColor([66, 192, 251, 255], 'Medium Azure', 156),
        new LegoColor([97, 175, 255, 255], 'Medium Blue', 42),
        new LegoColor([159, 195, 233, 255], 'Bright Light Blue', 105),
        new LegoColor([90, 113, 132, 255], 'Sand Blue', 55),
        new LegoColor([95, 38, 131, 255], 'Dark Purple', 89),
        new LegoColor([136, 94, 158, 255], 'Medium Lavendar', 157),
        new LegoColor([177, 140, 191, 255], 'Lavender', 154),
        new LegoColor([181, 41, 82, 255], 'Magenta', 71),
        new LegoColor([200, 112, 128, 255], 'Dark Pink', 47),
        new LegoColor([255, 187, 255, 255], 'Bright Pink', 104),
      ],
    };
    super({ trackStateHistory: true });
    this.setState(initialState, ColorListStoreActions.Initialize);
  }
  public get(): Observable<LegoColor[]> {
    const { customColors, providedColors } = this.getState();
    return of(providedColors.concat(customColors));
  }

  public add(color: LegoColor) {
    const state = this.getState();
    state.customColors.push(color);
    this.setState(
      { customColors: state.customColors },
      ColorListStoreActions.AddColor
    );
  }

  public remove(color: LegoColor) {
    const state = this.getState();
    const newCustomColors = state.customColors.map((c) => {
      if (c !== color) {
        return c;
      }
    });
    this.setState(
      { customColors: newCustomColors },
      ColorListStoreActions.RemoveColor
    );
  }
}
