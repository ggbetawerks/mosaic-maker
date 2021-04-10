import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { AppTemplateDirective } from './app-template';

@Component({
  selector: 'app-accordion-item',
  styleUrls: ['accordion-item.scss'],
  template: `<div class="header" (click)="toggleOpen()">
      <ion-item>
        <h4>
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </h4>
        <ion-icon
          slot="end"
          name="{{ this.isOpen ? 'chevron-down' : 'chevron-forward' }}"
        ></ion-icon>
      </ion-item>
    </div>
    <div class="content">
      <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
    </div>`,
})
export class AccordionItemComponent implements AfterViewInit, AfterContentInit {
  @ContentChildren(AppTemplateDirective) templates!: QueryList<any>;

  headerTemplate: TemplateRef<any>;
  contentTemplate: TemplateRef<any>;

  constructor(private hostElement: ElementRef) {}

  isOpen: boolean = false;
  public content: HTMLDivElement;
  private isTransitioning: boolean = false;

  ngAfterViewInit() {
    this.content = this.hostElement.nativeElement.querySelector('.content');
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;

        default:
          this.headerTemplate = item.template;
      }
    });
  }

  toggleOpen() {
    if (this.isTransitioning) {
      return;
    }

    this.isOpen = !this.isOpen;
    this.isTransitioning = true;

    const e = new CustomEvent('toggle', {
      bubbles: true,
      detail: {
        element: this.hostElement,
        content: this.content,
        shouldOpen: this.isOpen,
        startTransition: async () => {
          this.isTransitioning = true;
        },
        endTransition: async () => {
          this.isTransitioning = false;
        },
        setClosed: async () => {
          this.isOpen = false;
        },
      },
    });

    this.hostElement.nativeElement.dispatchEvent(e);
  }
}
