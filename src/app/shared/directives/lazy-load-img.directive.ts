import { Directive, ElementRef, Input, OnInit } from "@angular/core";

/**
 * Directive to lazy load images using IntersectionObserver.
 * Usage: <img [appLazyLoadImg]="imageUrl" />
 */
@Directive({
  selector: "img[appLazyLoadImg]",
})
export class LazyLoadImgDirective implements OnInit {
  @Input("appLazyLoadImg") src = "";

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    const img = this.el.nativeElement;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = this.src;
          obs.unobserve(img);
        }
      });
    });
    obs.observe(img);
  }
}
