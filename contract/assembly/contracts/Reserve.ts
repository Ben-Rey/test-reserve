import { Serializable, Args, Result } from '@massalabs/as-types';

export default class Reserve implements Serializable {
  constructor(
    public addr: string = '',
    public name: string = '',
    public symbol: string = '',
    public decimals: u64 = 0,
    public mTokenAddress: string = '',
    public interestCalcAddress: string = '',
    public baseLTV: u64 = 0,
    public LiquidationThreshold: u64 = 0,
    public LiquidationBonus: u64 = 0,
  ) {}

  public serialize(): StaticArray<u8> {
    const args = new Args();
    args.add(this.addr);
    args.add(this.name);
    args.add(this.symbol);
    args.add(this.decimals);
    args.add(this.mTokenAddress);
    args.add(this.interestCalcAddress);
    args.add(this.baseLTV);
    args.add(this.LiquidationThreshold);
    args.add(this.LiquidationBonus);
    return args.serialize();
  }

  public deserialize(data: StaticArray<u8>, offset: i32): Result<i32> {
    const args = new Args(data, offset);

    this.addr = args.nextString().unwrap();
    this.name = args.nextString().unwrap();
    this.symbol = args.nextString().unwrap();
    this.decimals = args.nextU64().unwrap();
    this.mTokenAddress = args.nextString().unwrap();
    this.interestCalcAddress = args.nextString().unwrap();
    this.baseLTV = args.nextU64().unwrap();
    this.LiquidationThreshold = args.nextU64().unwrap();
    this.LiquidationBonus = args.nextU64().unwrap();

    return new Result(args.offset);
  }
}
