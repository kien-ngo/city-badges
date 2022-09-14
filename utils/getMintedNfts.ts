import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";

export const getMintedNfts = async (
  sdk: ThirdwebSDK
): Promise<NFTMetadataOwner[]> => {
  if (!sdk) {
    alert("Error: Could not load thirdweb sdk");
    return [];
  }
  const nftCollectionAddress = CONTRACTS.MINT[CURRENT_CHAIN];
  const nftCollection = sdk.getNFTCollection(nftCollectionAddress);
  // Get all the NFTs that have been minted from the contract
  const mintedNfts: NFTMetadataOwner[] = await nftCollection?.getAll();
  return mintedNfts;
};
