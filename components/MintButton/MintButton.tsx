import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { useState } from "react";
import { CONTRACTS, CURRENT_CHAIN } from "../../utils/contractAddress";
import nft_styles from "../../styles/Nft.module.css";
import { CityBadgeNft } from "../../NftData/nfts";

const MintButton = ({ nft }: { nft: CityBadgeNft }) => {
  const address = useAddress();
  const nftCollectionAddress = CONTRACTS.MINT[CURRENT_CHAIN];
  const [loading, setLoading] = useState<boolean>(false);
  const nftCollection = useNFTCollection(nftCollectionAddress);
  const mintNft = async (id: number) => {
    if (!address) return alert("Please connect a wallet first");
    setLoading(true);
    try {
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
    <button className={nft_styles.MintBtn} onClick={() => mintNft(nft.id)}>
      {loading ? "Loading..." : `${nft.price} ${CONTRACTS.SYMBOL[CURRENT_CHAIN]}`}
    </button>
  );
};

export default MintButton;
