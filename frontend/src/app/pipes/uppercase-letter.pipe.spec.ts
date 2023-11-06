import { UppercaseLetterPipe } from './uppercase-letter.pipe';

describe('UppercaseLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
