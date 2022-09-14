import type { NextApiRequest, NextApiResponse } from "next";
import {
  NFTMetadataOwner,
  PayloadToSign721,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import { NFTs } from "../../data/nfts";
import { getThirdWebSdk } from "../../utils/getThirdWebSdk";
import { getMintedNfts } from "../../utils/getMintedNfts";
import { CONTRACTS, CURRENT_CHAIN } from "../../data/constants";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(400).json({ message: "Invalid request" });
  const mintedLookup = Array.from({ length: NFTs.length }, () => false);
  const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(false);
  const nftCollectionAddress = CONTRACTS.MINT[CURRENT_CHAIN];
  const nftCollection = thirdwebSdk.getNFTCollection(nftCollectionAddress);
  // Get all the NFTs that have been minted from the contract
  const mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
  // If no NFTs have been minted, return the array of NFT metadata
  if (!mintedNfts) res.status(200).json(NFTs);
  // If there are NFTs that have been minted, go through each of them
  mintedNfts.forEach((nft) => {
    if (!nft.metadata.attributes) return;
    // Find the id attribute of the current NFT
    // @ts-expect-error
    const positionInMetadataArray = nft.metadata.attributes.id;
    // Change the minted status of the NFT metadata at the position of ID in the NFT metadata array
    mintedLookup[positionInMetadataArray] = true;
  });
  // Get ID of the NFT to mint and address of the user from request body
  const { id, address } = req.body;

  // Ensure that the requested NFT has not yet been minted
  if (mintedLookup[id] === true) {
    res.status(400).json({ message: "Invalid request | This NFT is minted" });
  }

  // Allow the minting to happen anytime from now
  const startTime = new Date(0);

  // Find the NFT to mint in the array of NFT metadata using the ID
  const nftToMint = NFTs[id];

  // Set up the NFT metadata for signature generation
  const metadata: PayloadToSign721 = {
    metadata: {
      name: nftToMint.name,
      description: "",
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
}
