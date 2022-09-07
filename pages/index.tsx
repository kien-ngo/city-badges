import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { CityBadgeNft, NFTs } from "../classes/nfts";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
import usePageLoad from "../hooks/usePageLoad";
const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);

const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));

const Home: NextPage = () => {
  const [allNfts, setAllNfts] = useState<CityBadgeNft[]>(NFTs);
  const [mintedNfts, setMintedNfts] = useState<NFTMetadataOwner[]>([]);
  const fetchMintedNft = async () => {
    const _mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
    setMintedNfts(mintedNfts);
    _mintedNfts.forEach((nft) => {
      if (!nft.metadata.attributes) return;
      // Find the id attribute of the current NFT
      // @ts-expect-error
      const positionInMetadataArray = nft.metadata.attributes.id;
      // Change the minted status of the NFT metadata at the position of ID in the NFT metadata array
      if (
        positionInMetadataArray <= allNfts.length &&
        allNfts[positionInMetadataArray]
      )
        allNfts[positionInMetadataArray].minted = true;
    });
    const updatedNfts: CityBadgeNft[] = [...allNfts];
    setAllNfts(updatedNfts);
  };
  const { pageLoaded, isPageLoading } = usePageLoad();
  useEffect(() => {
    fetchMintedNft();
  }, [pageLoaded]);
  return (
    <Container>
      <div className={styles.FilterBar}>
        <select name="SelectAvailability" id="SelectAvailability">
          <option value="available">All</option>
          <option value="available">Available</option>
        </select>
      </div>
      <div className={styles.NftContainer}>
        {allNfts.map((nft) => (
          <NftItem_ nft={nft} key={nft.id} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
