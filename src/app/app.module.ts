import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ColorUtilitiesService } from './services/color-utilities.service';
import { ColorListService } from './services/color-list.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccordionItemComponent } from './components/accordion-item';
import { AccordionGroupComponent } from './components/accordion-group';
import { AppTemplateDirective } from './components/app-template';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        AccordionItemComponent,
        AccordionGroupComponent,
        AppTemplateDirective,
    ],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    exports: [AppTemplateDirective],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        ColorUtilitiesService,
        ColorListService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
