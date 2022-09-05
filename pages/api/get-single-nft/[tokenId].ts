import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { CityBadgeNft, NFTs } from "../../../classes/nfts";
import { CONTRACT_ADDRESS } from "../../../utils/contractAddress";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenId } = req.query;
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, "avalanche");
  const nftCollectionAddress = CONTRACT_ADDRESS;
  const nftCollection = sdk.getNFTCollection(nftCollectionAddress);
  const mintedNfts: NFTMetadataOwner[] = await nftCollection?.getAll();
  let nfts: CityBadgeNft[] = NFTs;
  mintedNfts.forEach((nft) => {
    if (!nft.metadata.attributes) return;
    // Find the id attribute of the current NFT
    // @ts-expect-error
    const positionInMetadataArray = nft.metadata.attributes.id;
    nfts[positionInMetadataArray].minted = true;
  });
  switch (req.method) {
    case "GET":
      const result: CityBadgeNft | undefined = nfts.find(
        (nft) => nft.id == Number(tokenId)
      );
      if (!result) {
        res.status(400).json({
          message: "Error: Could not find NFT with tokenId: ",
          tokenId,
        });
      } else {
        let ownerAddress: string = "";
        if (result.minted) {
          const _nft = mintedNfts.find(
            // @ts-expect-error
            (nft) => nft.metadata.attributes!.id === result.id
          );
          if (_nft) ownerAddress = _nft.owner;
        }
        res.status(200).json({ result: result, ownerAddress: ownerAddress });
      }
      break;
  }
}
