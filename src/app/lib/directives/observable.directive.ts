import {Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Directive({
  selector: '[appObserveElement]',
  exportAs: '[intersection]'
})
export class ObservableDirective implements OnDestroy {
  @Input() root: HTMLElement | null = null
  @Input() rootMargin = '0px 0px 0px 0px'
  @Input() threshold = 1
  @Input() isContinuous = false

  @Output() isIntersecting = new EventEmitter<string>()

  _isIntersecting = false
  subscription: Subscription

  constructor(private element: ElementRef) {
    this.subscription = this.createAndObserve()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  createAndObserve() {
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    }

    return new Observable<string>(subscriber => {
      const intersectionObserver = new IntersectionObserver(entries => {
        const entry = entries.find(entry => entry.isIntersecting);
        subscriber.next(entry?.target.id)

        entry?.isIntersecting &&
        !this.isContinuous &&
        intersectionObserver.disconnect()
      }, options)

      intersectionObserver.observe(this.element.nativeElement)

      return {
        unsubscribe() {
          intersectionObserver.disconnect()
        },
      }
    })
      .subscribe(elementId => {
        this.isIntersecting.emit(elementId)
        this._isIntersecting = !!elementId;
      });
  }
}
