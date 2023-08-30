import { catchError, forkJoin, Observable, of, Subject, takeUntil } from 'rxjs';
import { ChangeDetectorRef, inject, Injectable, OnDestroy } from '@angular/core';
import { ToastService } from './toaster/toast.service';

@Injectable()
export abstract class BaseComponent implements OnDestroy {

  private readonly destroy$ = new Subject();
  protected loading: boolean = false;
  private readonly toasterService: ToastService;

  protected constructor(private readonly detector: ChangeDetectorRef) {
    this.toasterService = inject(ToastService);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  subscribeAndRender<T>(stream$: Observable<T>, callback: (args: T) => void) {
    this.loading = true;
    stream$
      //TODO corrigir mensagem no catchError, exibir toaster em caso de falha
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.loading = false;
          this.toasterService.showError('ERROR', error.message);
          this.detector.detectChanges();
          return of();
        })
      )
      .subscribe((subscribeArgs: T) => {
        this.loading = false;
        callback(subscribeArgs);
        this.detector.detectChanges();
      });
  }

  subscribeAndRenderMany<T>(stream$: Observable<T>[], callback: (args: T[]) => void) {
    this.loading = true;
    forkJoin(stream$)
    .pipe(takeUntil(this.destroy$))
    .subscribe((subscribeArgs) => {
      callback(subscribeArgs);
      this.detector.detectChanges();
      this.loading = false;
    });
  }

  detectChanges() {
    this.detector.detectChanges();
  }
}
