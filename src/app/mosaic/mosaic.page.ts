import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.page.html',
  styleUrls: ['./mosaic.page.scss'],
})
export class MosaicPage implements OnInit {
  sourceImageDataURL: string;
  targetWidth = 48;
  targetHeight = 48;

  constructor() {}

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
}
