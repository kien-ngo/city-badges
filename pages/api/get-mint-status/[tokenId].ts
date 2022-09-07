import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { getMintedNfts } from "../../../utils/getMintedNfts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenId } = req.query;
  const mintedNfts: NFTMetadataOwner[] = await getMintedNfts()
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
