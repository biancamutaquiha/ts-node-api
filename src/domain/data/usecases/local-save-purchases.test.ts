/* eslint-disable require-jsdoc */
class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}
  async save(): Promise<void> {
    this.cacheStore.delete();
  }
}

interface CacheStore {
  delete(): void;
}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;

  delete(): void {
    this.deleteCallsCount++;
  }
}


test('Local Save Purchases - not delete cache on init', () => {
  const cacheStore = new CacheStoreSpy();

  new LocalSavePurchases(cacheStore);

  expect(cacheStore.deleteCallsCount).toBe(0);
});

test('Local Save Purchases - delete old cache on save', async () => {
  const cacheStore = new CacheStoreSpy();

  const sut = new LocalSavePurchases(cacheStore);
  await sut.save();

  expect(cacheStore.deleteCallsCount).toBe(1);
});

