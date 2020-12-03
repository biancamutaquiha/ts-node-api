/* eslint-disable require-jsdoc */
class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {

  }
}

interface CacheStore {

}

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
}


test('Local Save Purchases - not delete cache on init', () => {
  const cacheStore = new CacheStoreSpy();

  new LocalSavePurchases(cacheStore);

  expect(cacheStore.deleteCallsCount).toBe(0);
});

