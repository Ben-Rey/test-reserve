import { Args, stringToBytes } from '@massalabs/as-types';
import { Storage, createSC, generateEvent } from '@massalabs/massa-as-sdk';
import Reserve from './Reserve';

const RESERVE_KEY: string = 'reserve';

export function initReserve(binaryArgs: StaticArray<u8>): void {
  const args: Args = new Args(binaryArgs);
  let reserve: Reserve = args.nextSerializable<Reserve>().unwrap();

  let mToken_addr = createSC(new StaticArray<u8>(0));

  reserve.mTokenAddress = mToken_addr.toString();

  const storageKey = `${RESERVE_KEY}_${reserve.addr}`;

  const reserveExists = Storage.has(stringToBytes(storageKey));

  assert(!reserveExists, 'Reserve already exists');

  // save reserve to storage
  Storage.set(stringToBytes(storageKey), reserve.serialize());

  generateEvent(
    'ReserveCreated : ' +
      'LiquidationThreshold: ' +
      reserve.LiquidationBonus.toString() +
      ', LiquidationThreshold:' +
      reserve.LiquidationThreshold.toString() +
      ', baseLTV:' +
      reserve.baseLTV.toString() +
      ', decimals:' +
      reserve.decimals.toString() +
      ', interestCalcAddress:' +
      reserve.interestCalcAddress.toString() +
      ', mTokenAddress:' +
      reserve.mTokenAddress.toString() +
      ', name:' +
      reserve.name.toString() +
      ', symbol:' +
      reserve.symbol.toString() +
      ', addr:' +
      reserve.addr.toString(),
  );
}
