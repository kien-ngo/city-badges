import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CURRENT_CHAIN } from "../data/constants";

export const getThirdWebSdk = (readonly: boolean = true) => {
  const thirdwebChain: string = CURRENT_CHAIN.toLowerCase();
  if (readonly) return new ThirdwebSDK(thirdwebChain);
  return ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, thirdwebChain);
};
