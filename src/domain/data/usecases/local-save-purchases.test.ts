/* eslint-disable require-jsdoc */
class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}
  async save(): Promise<void> {
    this.cacheStore.delete('purchases');
  }
}

interface CacheStore {
  delete:(key: string) => void;

}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  key: string = '';

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}

type SutTypes = {
  sut: LocalSavePurchases,
  cacheStore: CacheStoreSpy
}

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);

  return {
    sut,
    cacheStore,
  };
};


test('Local Save Purchases - not delete cache on init', () => {
  const {cacheStore} = makeSut();
  expect(cacheStore.deleteCallsCount).toBe(0);
});

test('Local Save Purchases - delete old cache on save', async () => {
  const {sut, cacheStore} = makeSut();
  await sut.save();
  expect(cacheStore.deleteCallsCount).toBe(1);
});

test('Local Save Purchases - delete with correct key', async () => {
  const {sut, cacheStore} = makeSut();
  await sut.save();
  expect(cacheStore.key).toBe('purchases');
});

