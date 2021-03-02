import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MosaicPageRoutingModule } from './mosaic-routing.module';

import { MosaicPage } from './mosaic.page';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorUtilitiesService } from '../services/color-utilities.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    MosaicPageRoutingModule,
  ],
  declarations: [MosaicPage],
  providers: [ColorUtilitiesService],
})
export class MosaicPageModule {}
