import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('itemContainer') itemContainer!: ElementRef;

  items = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: '10' },
    { name: '11' },
    { name: '12' },
    { name: '13' },
    { name: '14' },
    { name: '15' },
    { name: '16' },
  ];
  selectedItemIndex = 0;
  itemsPerRow = 0; // Set this based on your layout

  constructor(private renderer: Renderer2) {}
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let newIndex = this.selectedItemIndex;

    switch (event.key) {
      case 'ArrowLeft':
        if (newIndex % this.itemsPerRow !== 0) {
          newIndex--;
        }
        break;
      case 'ArrowRight':
        if (newIndex % this.itemsPerRow !== this.itemsPerRow - 1) {
          newIndex++;
        }
        break;
      case 'ArrowUp':
        if (newIndex >= this.itemsPerRow) {
          newIndex -= this.itemsPerRow;
        }
        break;
      case 'ArrowDown':
        if (newIndex < this.items.length - this.itemsPerRow) {
          newIndex += this.itemsPerRow;
        }
        break;
    }

    this.selectedItemIndex = newIndex;
  }

  ngAfterViewInit() {
    this.calculateItemsPerRow();
    this.renderer.listen(window, 'resize', () => {
      this.calculateItemsPerRow();
    });
  }

  calculateItemsPerRow() {
    if (this.container && this.itemContainer) {
      const containerWidth = this.container.nativeElement.offsetWidth;
      const itemWidth = this.itemContainer.nativeElement.offsetWidth;
      this.itemsPerRow = Math.floor(containerWidth / itemWidth);
      console.log('asdasdasdasdasd',this.itemsPerRow)
    }
  }
}


