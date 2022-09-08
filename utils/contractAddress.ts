import { ChainId } from "@thirdweb-dev/sdk";

export const AVALANCHE_MINT_CONTRACT_ADDRESS: string =
  "0x0830B74062E88581b2e0a68fcbc5F57D5318dDcA";
export const AVALANCHE_MARKETPLACE_CONTRACT_ADDRESS: string =
  "0x10e0C7bBd9A8E37F3c3264aAc8B74Afc623476eE";
export const POLYGON_MINT_CONTRACT_ADDRESS: string =
  "0x7F93419B3043EceBEf58E175671461050312f46c";
export const POLYGON_MARKETPLACE_CONTRACT_ADDRESS: string = "";

type SUPPORTED_CHAINS = "AVALANCHE" | "POLYGON";
type ContractProps = {
  CHAIN: {
    [key in SUPPORTED_CHAINS]: any;
  };
  RPC: {
    [key in SUPPORTED_CHAINS]: string;
  };
  MINT: {
    [key in SUPPORTED_CHAINS]: string;
  };
  MARKETPLACE: {
    [key in SUPPORTED_CHAINS]: string;
  };
};
export const CONTRACTS: ContractProps = {
  CHAIN: {
    AVALANCHE: ChainId.Avalanche,
    POLYGON: ChainId.Polygon,
  },
  RPC: {
    AVALANCHE: "https://rpc.ankr.com/avalanche",
    POLYGON: "https://rpc.ankr.com/polygon",
  },
  MINT: {
    AVALANCHE: AVALANCHE_MINT_CONTRACT_ADDRESS,
    POLYGON: POLYGON_MINT_CONTRACT_ADDRESS,
  },
  MARKETPLACE: {
    AVALANCHE: AVALANCHE_MARKETPLACE_CONTRACT_ADDRESS,
    POLYGON: POLYGON_MARKETPLACE_CONTRACT_ADDRESS,
  },
};
export const CURRENT_CHAIN: SUPPORTED_CHAINS = "POLYGON";
