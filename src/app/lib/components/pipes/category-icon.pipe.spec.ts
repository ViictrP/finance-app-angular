import {CategoryIconPipe} from './category-icon.pipe';

describe('CategoryIconPipe', () => {
  const pipe = new CategoryIconPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should transform', () => {
    const mapped = pipe.transform('food');

    expect(mapped).toStrictEqual('ph-fork-knife-fill');
  });
});
