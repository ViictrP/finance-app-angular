import {CategoryPipe} from './category.pipe';

describe('CategoryPipe', () => {
  let pipe: CategoryPipe = new CategoryPipe();

  it('Should map the category', () => {
    const mapped = pipe.transform('RESTAURANTE');

    expect(mapped).toStrictEqual('Restaurante');
  });
});
