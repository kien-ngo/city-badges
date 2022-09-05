import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { useState } from "react";
import { CityBadgeNft } from "../../classes/nfts";
import { CONTRACT_ADDRESS } from "../../utils/contractAddress";
import styles from "./NftItem.module.css";
import nft_styles from "../../styles/Nft.module.css";
import NftImage from "../NftImage";

const NftItem = ({ nft }: { nft: CityBadgeNft }) => {
  const address = useAddress();
  const [loading, setLoading] = useState<boolean>(false);
  const nftCollectionAddress = CONTRACT_ADDRESS;
  // Connect to contract using the address
  const nftCollection = useNFTCollection(nftCollectionAddress);
  // Function which generates signature and mints NFT
  const mintNft = async (id: number) => {
    if (!address) return alert("Please connect a wallet first");
    setLoading(true);
    try {
      // Call API to generate signature and payload for minting
      const response = await fetch("/api/get-nfts", {
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
      console.log(error);
      alert("Failed to mint NFT!");
    }
  };
  // Get the NFT collection using its contract address
  return (
    <div className={nft_styles.NftItem}>
      <NftImage desc={nft.description} url={nft.url} tokenId={nft.id} />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>
          {nft.name}
          <br></br>
          <a
            style={{ textDecoration: "undelined", color: "blue" }}
            target="_blank"
            rel="noreferrer"
            href={nft.url}
          >
            View full image
          </a>
        </div>
        {!nft.minted ? (
          <button
            className={nft_styles.MintBtn}
            onClick={() => mintNft(nft.id)}
          >
            {loading ? "Loading..." : `${nft.price}AVAX`}
          </button>
        ) : (
          <button className={nft_styles.MintBtn} disabled>
            Minted
          </button>
        )}
      </div>
    </div>
  );
};

export default NftItem;
