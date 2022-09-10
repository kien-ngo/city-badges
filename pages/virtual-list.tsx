import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/MintPage.module.css";
import { useState } from "react";
import { CityBadgeNft, NFTs } from "../NftData/nfts";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
import { useRouter } from "next/router";
import usePageLoad from "../hooks/usePageLoad";
import { FixedSizeGrid as Grid } from "react-window";
import useWindowSize from "../hooks/useWindowSize";

const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);

const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));

type _props = {
  columnIndex: number;
  rowIndex: number;
  style: any;
};
const Cell = ({ columnIndex, rowIndex, style }: _props) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? "GridItemOdd"
          : "GridItemEven"
        : rowIndex % 2
        ? "GridItemOdd"
        : "GridItemEven"
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
  </div>
);
const VirtualPage: NextPage = () => {
  const router = useRouter();
  const { pageLoaded } = usePageLoad();
  const [allNfts, setAllNfts] = useState<CityBadgeNft[]>(NFTs);
  const SIZE = useWindowSize();
  // To track if an NFT is minted
  const [mintedLookup, setMintedLookup] = useState<boolean[]>(
    Array.from({ length: NFTs.length }, () => false)
  );
  // Fetch the current NFTs in the collection
  // const fetchMintedNft = async () => {
  //   const _mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
  //   const _mintedLookup = Array.from({ length: allNfts.length }, () => false);
  //   _mintedNfts.forEach((nft) => {
  //     if (!nft.metadata.attributes) return;
  //     // @ts-expect-error
  //     const tokenId: number = nft.metadata.attributes.id;
  //     const index: number = allNfts.findIndex((nft) => nft.id === tokenId);
  //     if (index < 0) return;
  //     _mintedLookup[index] = true;
  //   });
  //   setMintedLookup(_mintedLookup);
  // };

  return (
    <Container>
      <div className={styles.FilterBar}>
        <select name="SelectAvailability" id="SelectAvailability">
          <option value="available">All</option>
          <option value="available">Available</option>
        </select>
      </div>
      <Grid
        className="Grid"
        columnCount={SIZE.width! / 256}
        columnWidth={256}
        rowCount={NFTs.length / (SIZE.width! / 256)}
        rowHeight={310}
        width={SIZE.width!}
        height={SIZE.height! - 160}
        style={{ margin: "auto" }}
      >
        {Cell}
      </Grid>
      {/* <div className={styles.NftContainer}> */}
      {/* {allNfts && allNfts.length && (
          <>
            {allNfts.map((nft, index) => (
              <NftItem_ nft={nft} key={nft.id} minted={mintedLookup[index]} />
            ))}
          </>
        )} */}
      {/* </div> */}
    </Container>
  );
};

export default VirtualPage;
