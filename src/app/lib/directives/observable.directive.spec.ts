import {ObservableDirective} from './observable.directive';

describe('ObservableDirective', () => {
  const directive = new ObservableDirective({} as any);

  it('Should be created', () => {
    expect(directive).toBeTruthy();
  });

  it('Should call unsubscribe on destroy', () => {
    const unsub = jest.spyOn(directive.subscription, 'unsubscribe');
    directive.ngOnDestroy();

    expect(unsub).toHaveBeenCalled();
  });
});
