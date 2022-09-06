import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { MINT_CONTRACT_ADDRESS } from "../../../utils/contractAddress";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenId } = req.query;
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, "avalanche");
  const nftCollectionAddress = MINT_CONTRACT_ADDRESS;
  const nftCollection = sdk.getNFTCollection(nftCollectionAddress);
  const mintedNfts: NFTMetadataOwner[] = await nftCollection?.getAll();
  if (req.method !== "GET") return;
  const result: NFTMetadataOwner | undefined = mintedNfts.find(
    (nft) => nft.metadata.id.toNumber() == Number(tokenId)
  );
  if (!result) {
    res.status(400).json({
      message: "Error: Could not find NFT with tokenId: ",
      tokenId,
    });
  } else {
    res.status(200).json({ result });
  }
}
