import { useEffect, useState } from "react";
import "./App.css";
import {
  Args,
  Client,
  ClientFactory,
  DefaultProviderUrls,
  fromMAS,
} from "@massalabs/massa-web3";
import pollAsyncEvents from "./pollAsyncEvent";

import {
  PublicKey,
  SecretKey,
} from "@massalabs/massa-web3/dist/esm/utils/keyAndAddresses";
import { Reserve } from "./Reserve";

const RESERVE = new Reserve(
  "AS12SHcxwF4U4Wk4YvxPQGEETWe5kdL5X87xNKvburLiihv12aSdq",
  "MyTestToken",
  "Symbol",
  BigInt(10),
  "",
  "AS13Vg3V5xaomzXfJK87gnkhZAor7yj2HAJgY36WbCnQXfMVdQ1h",
  BigInt(20),
  BigInt(30),
  BigInt(40)
);

function App() {
  const [client, setClient] = useState<Client | null>(null);
  const [opId, setOpId] = useState<string>("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const secret = "S1NA786im4CFL5cHSmsGkGZFEPxqvgaRP8HXyThQSsVnWj4tR7d";
    const secretKey = new SecretKey(secret);
    const pub: PublicKey = await secretKey.getPublicKey();

    const myClient = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.BUILDNET,
      false,
      {
        address: "AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53",
        publicKey: pub.base58Encode,
        secretKey: secret,
      }
    );
    setClient(myClient);
  };

  async function addReserveData() {
    if (client) {
      const res = await client.smartContracts().callSmartContract({
        targetAddress: "AS1tkr37uHxnqtzg5fJS1mjT9XryZ7Md9U2LZdesQEwnpg3t1QBf",
        functionName: "initReserve",
        parameter: new Args().addSerializable(RESERVE),
        maxGas: 4_200_000_000n,
        coins: fromMAS(10),
        fee: BigInt(0),
      });
      setOpId(res);
      pollAsyncEvents(client, res);
    }
  }

  return (
    <>
      <h1>Massa Set Reserve</h1>
      <p>Operation Id: {opId}</p>
      <button onClick={addReserveData}>Call initReserve</button>
    </>
  );
}

export default App;
