import { forkJoin, Observable, Subject, take, takeUntil } from 'rxjs';
import {ChangeDetectorRef, Injectable, OnDestroy} from '@angular/core';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';

@Injectable()
export abstract class BaseComponent implements OnDestroy {

  private readonly destroy$ = new Subject();

  protected constructor(private readonly detector: ChangeDetectorRef) {
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

  subscribeAndRenderMany<T>(stream$: Observable<T>[], callback: (args: T[]) => void) {
    forkJoin(stream$)
    .pipe(takeUntil(this.destroy$))
    .subscribe((subscribeArgs) => {
      callback(subscribeArgs);
      this.detector.detectChanges();
    });
  }

  detectChanges() {
    this.detector.detectChanges();
  }
}
