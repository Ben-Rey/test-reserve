import {
  Args,
  IDeserializedResult,
  ISerializable,
} from "@massalabs/massa-web3";

export class Reserve implements ISerializable<Reserve> {
  constructor(
    public addr: string = "",
    public name: string = "",
    public symbol: string = "",
    public decimals: bigint = 0n,
    public mTokenAddress: string = "",
    public interestCalcAddress: string = "",
    public baseLTV: bigint = 0n,
    public LiquidationThreshold: bigint = 0n,
    public LiquidationBonus: bigint = 0n
  ) {}

  serialize(): Uint8Array {
    const args = new Args();
    args.addString(this.addr);
    args.addString(this.name);
    args.addString(this.symbol);
    args.addU64(BigInt(this.decimals));
    args.addString(this.mTokenAddress);
    args.addString(this.interestCalcAddress);
    args.addU64(BigInt(this.baseLTV));
    args.addU64(BigInt(this.LiquidationThreshold));
    args.addU64(BigInt(this.LiquidationBonus));
    return new Uint8Array(args.serialize());
  }

  deserialize(data: Uint8Array, offset: number): IDeserializedResult<Reserve> {
    const args = new Args(data, offset);

    this.addr = args.nextString();
    this.name = args.nextString();
    this.symbol = args.nextString();
    this.decimals = BigInt(args.nextU64().toString());
    this.mTokenAddress = args.nextString();
    this.interestCalcAddress = args.nextString();
    this.baseLTV = BigInt(args.nextU64().toString());
    this.LiquidationThreshold = BigInt(args.nextU64().toString());
    this.LiquidationBonus = BigInt(args.nextU64().toString());

    return { instance: this, offset: args.getOffset() };
  }
}
