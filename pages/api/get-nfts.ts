import type { NextApiRequest, NextApiResponse } from "next";
import {
  NFTMetadataOwner,
  PayloadToSign721,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import { CityBadgeNft, NFTs } from "../../classes/nfts";
import { getMintedNfts } from "../../utils/getMintedNfts";
import { getThirdWebSdk } from "../../utils/getThirdWebSdk";
import { MINT_CONTRACT_ADDRESS } from "../../utils/contractAddress";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let nfts: CityBadgeNft[] = NFTs;
  const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(false);
  const nftCollectionAddress = MINT_CONTRACT_ADDRESS;
  const nftCollection = thirdwebSdk.getNFTCollection(nftCollectionAddress);
  // Initialize the NFT collection with the contract address
  switch (req.method) {
    case "GET":
      try {
        // Get all the NFTs that have been minted from the contract
        const mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
        // If no NFTs have been minted, return the array of NFT metadata
        if (!mintedNfts) res.status(200).json(nfts);
        // If there are NFTs that have been minted, go through each of them
        mintedNfts.forEach((nft) => {
          if (!nft.metadata.attributes) return;
          // Find the id attribute of the current NFT
          // @ts-expect-error
          const positionInMetadataArray = nft.metadata.attributes.id;
          // Change the minted status of the NFT metadata at the position of ID in the NFT metadata array
          nfts[positionInMetadataArray].minted = true;
        });
      } catch (error) {
        console.error(error);
      }
      res.status(200).json(nfts);
      break;
    case "POST":
      // Get ID of the NFT to mint and address of the user from request body
      const { id, address } = req.body;

      // Ensure that the requested NFT has not yet been minted
      if (nfts[id].minted === true) {
        res
          .status(400)
          .json({ message: "Invalid request | This NFT is minted" });
      }

      // Allow the minting to happen anytime from now
      const startTime = new Date(0);

      // Find the NFT to mint in the array of NFT metadata using the ID
      const nftToMint = nfts[id];

      // Set up the NFT metadata for signature generation
      const metadata: PayloadToSign721 = {
        metadata: {
          name: nftToMint.name,
          description: nftToMint.description,
          image: nftToMint.url,
          // Set the id attribute which we use to find which NFTs have been minted
          attributes: {
            id: id,
            name: nftToMint.name,
            country: nftToMint.country,
            city: nftToMint.city,
            continent: nftToMint.continent,
          },
        },
        price: nftToMint.price,
        mintStartTime: startTime,
        to: address,
      };

      try {
        const response = await nftCollection?.signature.generate(metadata);

        // Respond with the payload and signature which will be used in the frontend to mint the NFT
        res.status(201).json({
          payload: response?.payload,
          signature: response?.signature,
        });
      } catch (error) {
        res.status(500).json({ error });
        console.error(error);
      }

      break;
    default:
      res.status(200).json(nfts);
  }
}
