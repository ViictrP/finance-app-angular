import {CategoryPipe} from './category.pipe';

describe('CategoryPipe', () => {
  let pipe: CategoryPipe = new CategoryPipe();

  it('Should map the category', () => {
    const mapped = pipe.transform('food');

    expect(mapped).toStrictEqual('Restaurante');
  });

  it('Should map the category into icon', () => {
    const mapped = pipe.transform('food', true);

    expect(mapped).toStrictEqual('ph-fork-knife-fill');
  });
});
