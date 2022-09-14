import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/MintPage.module.css";
import { useState } from "react";
import { CityBadgeNft, NFTs } from "../data/nfts";
const NftItem_ = dynamic(() => import("../components/MintNftItem"));
const RawPage: NextPage = () => {
  const [allNfts, setAllNfts] = useState<CityBadgeNft[]>(NFTs);
  return (
    <Container pageName="mint">
      <div className={styles.FilterBar}>
        <select name="SelectAvailability" id="SelectAvailability">
          <option value="available">All</option>
          <option value="available">Available</option>
        </select>
      </div>
      <div className={styles.NftContainer}>
        {allNfts && allNfts.length && (
          <>
            {allNfts.map((nft, index) => (
              <NftItem_ nft={nft} key={nft.id} minted={false} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default RawPage;
