/* eslint-disable require-jsdoc */

import {CacheStore} from './../../protocols/cache';

export class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}
  async save(): Promise<void> {
    this.cacheStore.delete('purchases');
  }
}
