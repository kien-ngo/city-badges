import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useNFTCollection,
} from "@thirdweb-dev/react";
import { useState } from "react";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
import { CityBadgeNft } from "../data/nfts";

const MintButton = ({ nft }: { nft: CityBadgeNft }) => {
  const address = useAddress();
  const nftCollectionAddress = CONTRACTS.MINT[CURRENT_CHAIN];
  const [loading, setLoading] = useState<boolean>(false);
  const nftCollection = useNFTCollection(nftCollectionAddress);
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const mintNft = async (id: number) => {
    if (!address) return alert("Please log in to mint");
    try {
      if (networkMismatch) {
        switchNetwork && switchNetwork(CONTRACTS.CHAIN_ID[CURRENT_CHAIN]);
        return;
      }
      setLoading(true);
      // Call API to generate signature and payload for minting
      const response = await fetch("/api/mint-nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, address }),
      });

      if (response) {
        const data = await response.json();
        const mintInput = {
          signature: data.signature,
          payload: data.payload,
        };
        await nftCollection?.signature.mint(mintInput);
        alert("NFT successfully minted!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Failed to mint NFT! " + error);
    }
  };
  return (
    <button onClick={() => mintNft(nft.id)}>
      {loading
        ? "Loading..."
        : `${nft.price} ${CONTRACTS.SYMBOL[CURRENT_CHAIN]}`}
    </button>
  );
};

export default MintButton;
