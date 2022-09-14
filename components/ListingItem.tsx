import { useAddress } from "@thirdweb-dev/react";
import { DirectListing, Marketplace } from "@thirdweb-dev/sdk";
import dynamic from "next/dynamic";
import nft_styles from "../styles/Nft.module.css";
import NftImage from "./NftImage";
const _BuyButton = dynamic(() => import("./BuyButton"));
const _CancelDirectListingButton = dynamic(
  () => import("./CancelDirectListingButton")
);
type Props = {
  nft: DirectListing;
  marketplace: Marketplace;
};
const ListingItem = (props: Props) => {
  const { nft, marketplace } = props;
  const address = useAddress();
  // @ts-expect-error
  const id: number = nft.asset.attributes!.id;
  return (
    <div className={nft_styles.NftItem}>
      <NftImage desc={""} url={nft.asset.image || nft.asset.uri} id={id} />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>{nft.asset.name!}</div>
        {nft.sellerAddress === address ? (
          <_CancelDirectListingButton
            listingId={nft.id}
            marketplace={marketplace}
          />
        ) : (
          <_BuyButton nft={nft} />
        )}
      </div>
    </div>
  );
};

export default ListingItem;
