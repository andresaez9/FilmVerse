import { TypeUser } from './type-user.pipe';

describe('TypeUser', () => {
  it('create an instance', () => {
    const pipe = new TypeUser();
    expect(pipe).toBeTruthy();
  });
});
