import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';

@Injectable()
export default class BaseComponent implements OnDestroy {

  private readonly destroy$ = new Subject();
  protected loading: boolean = false;

  protected constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  subscribeAndRender<T>(stream$: Observable<T>, callback: (args: T) => void) {
    this.loading = true;
    stream$
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.loading = false;
          this.changeDetectorRef.detectChanges();
          console.log(error.message);
          return of();
        })
      )
      .subscribe((subscribeArgs: T) => {
        this.loading = false;
        callback(subscribeArgs);
        this.changeDetectorRef.detectChanges();
      })
  }
}
