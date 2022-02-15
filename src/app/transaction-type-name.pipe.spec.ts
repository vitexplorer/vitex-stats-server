import { TransactionTypeNamePipe } from './transaction-type-name.pipe';

describe('TransactionTypeNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionTypeNamePipe();
    expect(pipe).toBeTruthy();
  });
});
