import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MINT_CONTRACT_ADDRESS } from "./contractAddress";

export const getMintedNfts = async (
  sdk: ThirdwebSDK
): Promise<NFTMetadataOwner[]> => {
  if (!sdk) {
    alert("Error: Could not load thirdweb sdk");
    return [];
  }
  const nftCollectionAddress = MINT_CONTRACT_ADDRESS;
  const nftCollection = sdk.getNFTCollection(nftCollectionAddress);
  // Get all the NFTs that have been minted from the contract
  const mintedNfts: NFTMetadataOwner[] = await nftCollection?.getAll();
  return mintedNfts;
};
