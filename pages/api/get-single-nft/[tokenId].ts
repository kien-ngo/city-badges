import type { NextApiRequest, NextApiResponse } from "next";
import { CityBadgeNft, NFTs } from "../../../classes/nfts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenId } = req.query;
  let nfts: CityBadgeNft[] = NFTs;
  if (req.method !== "GET") return;
  const result: CityBadgeNft | undefined = nfts.find(
    (nft) => nft.id == Number(tokenId)
  );
  if (!result) {
    res.status(400).json({
      message: "Error: Could not find NFT with tokenId: ",
      tokenId,
    });
  } else {
    res.status(200).json(result);
  }
}
