import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/MintPage.module.css";
import { useEffect, useState } from "react";
import { CityBadgeNft, NFTs } from "../NftData/nfts";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
import usePageLoad from "../hooks/usePageLoad";
import { paginated_nfts } from "../NftData/paginated_data";
const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);

const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));

// const PageButtons = ({ pages }: { pages: number[] }) => {
//   return (
//     <div className={styles.PaginationContainer}>
//       {pages.map((pageId: number) => (
//         <button className={styles.PageButton} key={pageId}>
//           {pageId}
//         </button>
//       ))}
//     </div>
//   );
// };

const MintPage: NextPage = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [pages, setPages] = useState<Array<number>>(
    Array.from({ length: paginated_nfts.length }, (_, i) => i + 1)
  );
  const [allNfts, setAllNfts] = useState<CityBadgeNft[]>(
    paginated_nfts[currentPageIndex]
  );
  const [mintedLookup, setMintedLookup] = useState<boolean[]>(
    Array.from({ length: allNfts.length }, () => false)
  );
  const fetchMintedNft = async () => {
    const _mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
    const _mintedLookup = Array.from({ length: allNfts.length }, () => false);
    _mintedNfts.forEach((nft) => {
      if (!nft.metadata.attributes) return;
      // Find the id attribute of the current NFT
      // @ts-expect-error
      const positionInMetadataArray = nft.metadata.attributes.id;
      // Change the minted status of the NFT metadata at the position of ID in the NFT metadata array
      if (
        positionInMetadataArray <= _mintedLookup.length &&
        typeof _mintedLookup[positionInMetadataArray] === "boolean"
      )
        _mintedLookup[positionInMetadataArray] = true;
    });
    setMintedLookup(_mintedLookup);
  };

  useEffect(() => {
    fetchMintedNft();
  }, [, allNfts]);
  // change page
  const goToPage = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    window.scrollTo(0,0)
  };
  // Update new nft items on changing page
  useEffect(() => {
    setAllNfts(paginated_nfts[currentPageIndex]);
  }, [currentPageIndex]);

  const PageContainer = () => {
    return (
      <div className={styles.PaginationContainer}>
        {pages.map((pageId: number, index: number) => (
          <button
            className={styles.PageButton}
            style={{
              backgroundColor: index === currentPageIndex ? "lightblue" : "",
            }}
            key={pageId}
            onClick={() => goToPage(index)}
          >
            {pageId}
          </button>
        ))}
      </div>
    );
  };
  return (
    <Container>
      <div className={styles.FilterBar}>
        <select name="SelectAvailability" id="SelectAvailability">
          <option value="available">All</option>
          <option value="available">Available</option>
        </select>
      </div>
      <PageContainer />
      <div className={styles.NftContainer}>
        {allNfts && allNfts.length && (
          <>
            {allNfts.map((nft, index) => (
              <NftItem_ nft={nft} key={nft.id} minted={mintedLookup[index]} />
            ))}
          </>
        )}
      </div>
      <PageContainer />
    </Container>
  );
};

export default MintPage;
