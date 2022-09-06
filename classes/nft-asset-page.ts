import { BigNumber } from "ethers";
import { CityBadgeNft } from "./nfts";

export type AssetPageNft = {
  result: CityBadgeNft | undefined;
  ownerAddress: string;
  id: BigNumber | undefined;
};
