import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CityBadgeNft } from "../../classes/nfts";
import { CONTRACT_ADDRESS } from "../../utils/contractAddress";
import { resolveIPFS } from "../../utils/resolveIPFS";
import styles from "./NftItem.module.css";
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
    <div className={styles.NftItem}>
      <Link href="/">
        <a>
          <Image
            alt={nft.description}
            src={resolveIPFS(nft.url)}
            width={256}
            height={256}
            loading="lazy"
            priority={false}
          ></Image>
        </a>
      </Link>
      <div className={styles.Bottom}>
        <div className={styles.NftDesc}>
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
          <button className={styles.MintBtn} onClick={() => mintNft(nft.id)}>
            {loading ? "Loading..." : `${nft.price}AVAX`}
          </button>
        ) : (
          <button className={styles.MintBtn} disabled>
            Minted
          </button>
        )}
      </div>
    </div>
  );
};

export default NftItem;
