import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[libBasicDirective]'
})
export class BasicDirectiveDirective implements OnInit{

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    this.renderer = renderer;
    this.elementRef = elementRef; }
  private elementRef: ElementRef;
  private renderer: Renderer2;
  @HostBinding('style.backgroundColor') backgroundColor;

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = 'blue';
  }
  @HostListener('mouseleave') mouseleave(eventData: Event)
  {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'yellow';
  }

  ngOnInit(): void {
    // this.elementRef.nativeElement.style.background = 'green';
  }

}
