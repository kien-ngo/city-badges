import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/MintPage.module.css";
import { useEffect, useState } from "react";
import { CityBadgeNft, NFTs } from "../data/nfts";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
import { useRouter } from "next/router";
import usePageLoad from "../hooks/usePageLoad";
import { COUNTRIES, Country } from "../classes/countries";
import { Continent, CONTINENTS } from "../classes/continents";
const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);

const NftItem_ = dynamic(() => import("../components/MintNftItem"));

const ITEMS_PER_PAGE: number = 24;

const splitArrayIntoChunks = (_nfts: CityBadgeNft[]): Array<CityBadgeNft[]> => {
  const nfts: Array<CityBadgeNft[]> = NFTs.reduce((all, one, i) => {
    const ch = Math.floor(i / ITEMS_PER_PAGE);
    // @ts-expect-error
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);
  return nfts;
};
type SearchQueryProps = {
  city: string | null;
  country: Country | null;
  continent: Continent | null;
  minted: boolean | null;
};
const getDefaultSearchQuery = (): SearchQueryProps => {
  const res: SearchQueryProps = {
    city: null,
    country: null,
    continent: null,
    minted: null,
  };
  return res;
};
const MintPage: NextPage = () => {
  const router = useRouter();
  const pageLoaded = usePageLoad();
  const [filteredNfts, setFilteredNfts] = useState<CityBadgeNft[]>(NFTs);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [paginatedNfts, setPaginatedNfts] = useState<Array<CityBadgeNft[]>>(
    splitArrayIntoChunks(filteredNfts)
  );
  const [pages, setPages] = useState<Array<number>>(
    Array.from({ length: paginatedNfts.length }, (_, i) => i + 1)
  );
  const [currentPageNfts, setCurrentPageNfts] = useState<CityBadgeNft[]>(
    paginatedNfts[currentPageIndex]
  );
  // To track if an NFT is minted
  const [mintedLookup, setMintedLookup] = useState<boolean[]>(
    Array.from({ length: currentPageNfts.length }, () => false)
  );

  const [filterByCity, setFilterByCity] = useState<string>('__All__')
  // Fetch the current NFTs in the collection
  const fetchMintedNft = async () => {
    const _mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
    const _mintedLookup = Array.from(
      { length: currentPageNfts.length },
      () => false
    );
    _mintedNfts.forEach((nft) => {
      if (!nft.metadata.attributes) return;
      // @ts-expect-error
      const tokenId: number = nft.metadata.attributes.id;
      const index: number = currentPageNfts.findIndex(
        (nft) => nft.id === tokenId
      );
      if (index < 0) return;
      _mintedLookup[index] = true;
    });
    setMintedLookup(_mintedLookup);
  };
  useEffect(() => {
    if (!pageLoaded) return;
    const _pageIndex = Number(router.query.page) || 0;
    console.log("_pageIndex: ", router.query.page);
    setCurrentPageIndex(_pageIndex);
  }, [pageLoaded]);
  // Update `currentPageNfts` on changing page
  useEffect(() => {
    setCurrentPageNfts(paginatedNfts[currentPageIndex]);
  }, [currentPageIndex]);

  // Update mintedLookup whenever `currentPageNfts` changes
  useEffect(() => {
    fetchMintedNft();
  }, [, currentPageNfts]);
  // Update pages when currentPageNfts change
  useEffect(() => {
    setCurrentPageIndex(0);
    setPaginatedNfts(splitArrayIntoChunks(currentPageNfts));
  }, [filteredNfts]);
  useEffect(() => {
    setPages(Array.from({ length: paginatedNfts.length }, (_, i) => i + 1));
  }, [paginatedNfts]);
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
    <Container pageName="mint">
      <div className={styles.FilterBar}>
        <select name="SelectAvailability" id="SelectAvailability">
          <option value="available">All</option>
          <option value="available">Available</option>
        </select>
      </div>
      <PageContainer />
      <div className={styles.NftContainer}>
        {currentPageNfts && currentPageNfts.length && (
          <>
            {currentPageNfts.map((nft, index) => (
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
