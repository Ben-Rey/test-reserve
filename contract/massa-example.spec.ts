import { stringToBytes } from '@massalabs/as-types';
import { initReserve } from '../contracts/main';
import Reserve from '../contracts/Reserve';

describe('Group test', () => {
  test('Testing event', () => {
    const reserve: Reserve = new Reserve(
      '0x000000',
      'name',
      'symbol',
      0,
      'mTokenAddress',
      'interestCalcAddress',
      0,
      0,
      0,
    );

    initReserve(reserve.serialize());
  });
});
