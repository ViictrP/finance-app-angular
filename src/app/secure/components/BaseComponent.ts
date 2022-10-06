import {Observable, Subject, takeUntil} from 'rxjs';
import {ChangeDetectorRef, Injectable, OnDestroy} from '@angular/core';

@Injectable()
export abstract class BaseComponent implements OnDestroy {

  private readonly destroy$ = new Subject();

  protected constructor(protected readonly detector: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  subscribeAndRender<T>(stream$: Observable<T>, callback: (args: T) => void) {
    stream$
      .pipe(takeUntil(this.destroy$))
      .subscribe((subscribeArgs: T) => {
        callback(subscribeArgs);
        this.detector.detectChanges();
      });
  }
}
