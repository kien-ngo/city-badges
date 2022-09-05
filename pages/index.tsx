import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { CityBadgeNft } from "../classes/nfts";
const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));
const Home: NextPage = () => {
  // State to set when we are loading
  const [loading, setLoading] = useState(false);
  // State for nft metadata
  const [nftMetadata, setNftMetadata] = useState<CityBadgeNft[]>([]);
  // State to track if the NFTs have been fetched
  const [fetchedNfts, setFetchedNfts] = useState(false);
  // Function to fetch NFTs from the backend
  const fetchNfts = async () => {
    try {
      const response = await fetch("/api/get-nfts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      // Save NFTs to the state variable
      setNftMetadata(data);
      // Record that the NFTs have been fetched
      setFetchedNfts(true);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect hook to get NFTs from API
  useEffect(() => {
    fetchNfts();
  }, [loading]);
  return (
    <Container>
      <div className={styles.NftContainer}>
        {fetchedNfts ? (
          <>
            {nftMetadata?.map((nft) => (
              <NftItem_ nft={nft} key={nft.id} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default Home;
