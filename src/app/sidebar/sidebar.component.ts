import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { LegoColor } from '../models/color';
import { ColorListService } from '../services/color-list.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  colorList$: Observable<LegoColor[]>;
  selectColors$: Observable<LegoColor[]>;

  fullColorList$: Observable<SelectableColor[]>;

  constructor(private colorList: ColorListService) {
    this.colorList$ = colorList.getColorList();
    this.selectColors$ = colorList.getSelectedColorList();

    const fullList = combineLatest([this.colorList$, this.selectColors$]).pipe(
      map(([allColors, selectedColors]) => {
        return allColors.map((c) => {
          const selectableColor = new SelectableColor();
          selectableColor.color = c;

          selectableColor.isSelected =
            selectedColors.findIndex(
              (x) =>
                x != null &&
                x.r === c.r &&
                x.g === c.g &&
                x.b === c.b &&
                x.a === c.a
            ) >= 0;
          return selectableColor;
        });
      })
    );
    this.fullColorList$ = fullList;
  }

  ngOnInit() {}

  public colorTrackByFn(index: number, item: SelectableColor): number {
    return item.color.bricklinkId;
  }

  colorClicked(event: any, color: LegoColor) {
    // console.log(event.target.checked);
    const isSelected = event.target.checked;
    if (isSelected) {
      this.colorList.addSelected(color);
    } else {
      this.colorList.removeSelected(color);
    }
  }
}
class SelectableColor {
  public isSelected: boolean;
  public color: LegoColor;
}
