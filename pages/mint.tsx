import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/MintPage.module.css";
import { useEffect, useState } from "react";
import { CityBadgeNft, NFTs } from "../NftData/nfts";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
import { useRouter } from "next/router";
import usePageLoad from "../hooks/usePageLoad";
const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);

const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));

// Split all the NFTs into chunks
const ITEMS_PER_PAGE: number = 24;
const PAGINATED_NFTS: Array<CityBadgeNft[]> = NFTs.reduce((all, one, i) => {
  const ch = Math.floor(i / ITEMS_PER_PAGE);
  // @ts-expect-error
  all[ch] = [].concat(all[ch] || [], one);
  return all;
}, []);

const MintPage: NextPage = () => {
  const router = useRouter();
  const { pageLoaded } = usePageLoad();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [pages, setPages] = useState<Array<number>>(
    Array.from({ length: PAGINATED_NFTS.length }, (_, i) => i + 1)
  );
  const [allNfts, setAllNfts] = useState<CityBadgeNft[]>(
    PAGINATED_NFTS[currentPageIndex]
  );
  // To track if an NFT is minted
  const [mintedLookup, setMintedLookup] = useState<boolean[]>(
    Array.from({ length: allNfts.length }, () => false)
  );
  // Fetch the current NFTs in the collection
  const fetchMintedNft = async () => {
    const _mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
    const _mintedLookup = Array.from({ length: allNfts.length }, () => false);
    _mintedNfts.forEach((nft) => {
      if (!nft.metadata.attributes) return;
      // @ts-expect-error
      const tokenId: number = nft.metadata.attributes.id;
      const index: number = allNfts.findIndex((nft) => nft.id === tokenId);
      if (index < 0) return;
      _mintedLookup[index] = true;
    });
    setMintedLookup(_mintedLookup);
  };
  useEffect(() => {
    if (!pageLoaded) return;
    const _pageIndex = Number(router.query.page) || 0;
    console.log("_pageIndex: ", router.query.page);
    setCurrentPageIndex(_pageIndex)
  }, [pageLoaded]);
  // Update `allNfts` on changing page
  useEffect(() => {
    setAllNfts(PAGINATED_NFTS[currentPageIndex]);
  }, [currentPageIndex]);

  // Update mintedLookup whenever `allNfts` changes
  useEffect(() => {
    fetchMintedNft();
  }, [, allNfts]);

  // change page
  const goToPage = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    router.push({ pathname: "/mint", query: { page: pageIndex } }, undefined, {
      shallow: true,
    });
    window.scrollTo(0, 0);
  };
  const PageContainer = () => {
    return (
      <div className={styles.PaginationContainer}>
        {pages.map((pageId: number, index: number) => (
          <button
            className={styles.PageButton}
            key={pageId}
            style={{
              backgroundColor: index === currentPageIndex ? "lightblue" : "",
            }}
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
