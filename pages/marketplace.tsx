import Container from "../components/Container";
import { useActiveListings, useMarketplace } from "@thirdweb-dev/react";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
import styles from "../styles/MintPage.module.css";
import ListingItem from "../components/ListingItem";
import { DirectListing } from "@thirdweb-dev/sdk";

const MarketplacePage = () => {
  const marketplace = useMarketplace(CONTRACTS.MARKETPLACE[CURRENT_CHAIN]);

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);
  if (listings) console.log(listings);
  return (
    <Container pageName="marketplace">
      <br />
      <br />
      {loadingListings && (
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Loading listings...
        </p>
      )}
      {listings && listings.length && (
        <div className={styles.NftContainer}>
          {listings.map((listing) => (
            <ListingItem key={listing.id} nft={listing as DirectListing} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default MarketplacePage;
