import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MINT_CONTRACT_ADDRESS } from "./contractAddress";
// Connect to SDK
// Learn more about securely accessing your private key: https://portal.thirdweb.com/web3-sdk/set-up-the-sdk/securing-your-private-key
const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, "avalanche");
const nftCollectionAddress = MINT_CONTRACT_ADDRESS;
// Initialize the NFT collection with the contract address
export const NFT_COLLECTION = sdk.getNFTCollection(nftCollectionAddress);

export const getMintedNfts = async () => {
  // Get all the NFTs that have been minted from the contract
  const mintedNfts: NFTMetadataOwner[] = await NFT_COLLECTION?.getAll();
  return mintedNfts;
};
