import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import {
  AuctionListing,
  DirectListing,
  NFTMetadataOwner,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CityBadgeNft, NFTs } from "../data/nfts";
import Container from "../components/Container";
import MintButton from "../components/MintButton";
import TransferNftButton from "../components/TransferButton";
import usePageLoad from "../hooks/usePageLoad";
import styles from "../styles/Asset.module.css";
import { resolveIPFS } from "../utils/resolveIPFS";
import truncateEthAddress from "../utils/truncateAddress";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
const _TransferNftModal = dynamic(
  () => import("../components/TransferNftModal"),
  { ssr: false }
);
const _SellButton = dynamic(() => import("../components/SellButton"));
const _CancelDirectListingButton = dynamic(
  () => import("../components/CancelDirectListingButton")
);
const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);
const AssetPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const address = useAddress();
  const pageLoaded = usePageLoad();
  const nft: CityBadgeNft | undefined = NFTs.find(
    (nft) => nft.id == Number(id)
  );
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [isMinted, setMintStatus] = useState<boolean>(false);
  const ownedByYou: boolean = ownerAddress === address;
  const [tokenId, setTokenId] = useState<BigNumber | undefined>();
  const marketplace = useMarketplace(CONTRACTS.MARKETPLACE[CURRENT_CHAIN]);
  const [listing, setListing] = useState<DirectListing | AuctionListing>();
  const [loadingListing, setLoadingListing] = useState<boolean>(true);
  // Fetch the current NFTs in the collection
  const fetchMintedNft = async () => {
    const mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
    const result: NFTMetadataOwner | undefined = mintedNfts.find(
      // @ts-expect-error
      (_nft) => _nft.metadata.attributes.id == Number(id)
    );
    if (result) {
      setMintStatus(true);
      setOwnerAddress(result.owner);
      setTokenId(result.metadata.id);
    }
  };
  useEffect(() => {
    fetchMintedNft();
  }, []);
  useEffect(() => {
    if (!address) return;
    (async () => {
      // Pass the listingId into the getListing function to get the listing with the given listingId
      const activeListings = await marketplace?.getActiveListings();
      if (!activeListings || !activeListings.length) return;
      console.log(activeListings);
      const listing = activeListings.find(
        // @ts-expect-error
        (item) => item.asset.attributes.id === Number(id)
      );
      if (listing) {
        console.log("Found listing: ", listing);
        setListing(listing);
      }
      setLoadingListing(false);
    })();
  }, [marketplace]);
  if (!pageLoaded) {
    return (
      <Container pageName="asset">
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Loading ...
        </p>
      </Container>
    );
  }
  if (!nft) {
    return (
      <Container pageName="asset">
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Could not find tokenId: {id}
        </p>
      </Container>
    );
  }
  return (
    <Container pageName="asset">
      <_TransferNftModal />
      <div className={styles.Container}>
        <div className={styles.Header}>
          <Image
            src={resolveIPFS(nft.url)}
            width={310}
            height={310}
            alt={nft!.name}
          />
          <div className={styles.Info}>
            <div style={{ fontSize: 30 }}>{nft.name}</div>
            {isMinted && (
              <div>
                {ownedByYou && ownerAddress ? (
                  <>Owned by you</>
                ) : (
                  <a
                    href={`${CONTRACTS.EXPLORER[CURRENT_CHAIN]}/address/${ownerAddress}`}
                    style={{
                      color: "lightcoral",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Owner: {truncateEthAddress(ownerAddress)}
                  </a>
                )}
              </div>
            )}
            <br />
            <div>
              <b>Attributes</b>:<br />
              City: {nft.city} <br />
              Country: {nft.country} <br />
              Continent: {nft.continent}
            </div>
            {isMinted ? (
              <>
                <span>
                  Contract:{" "}
                  <a
                    style={{
                      color: "lightcoral",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`${CONTRACTS.EXPLORER[CURRENT_CHAIN]}/address/${CONTRACTS.MINT[CURRENT_CHAIN]}`}
                  >
                    {truncateEthAddress(CONTRACTS.MINT[CURRENT_CHAIN])}
                  </a>
                </span>
                <span>
                  Token ID:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`${CONTRACTS.EXPLORER[CURRENT_CHAIN]}/token/${CONTRACTS.MINT[CURRENT_CHAIN]}?a=${nft.id}`}
                    style={{
                      color: "lightcoral",
                      textDecoration: "underline",
                    }}
                  >
                    {tokenId?.toString()}
                  </a>
                </span>
              </>
            ) : (
              <div>
                Mint: <MintButton nft={nft} />
              </div>
            )}
            {ownedByYou && tokenId && <TransferNftButton tokenId={tokenId} />}
            {ownedByYou && tokenId && !listing && (
              <_SellButton
                tokenId={tokenId}
                contractAddress={CONTRACTS.MINT[CURRENT_CHAIN]}
              />
            )}
            {listing && listing.sellerAddress === address && (
              <_CancelDirectListingButton
                listingId={listing.id}
                marketplace={marketplace!}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AssetPage;
