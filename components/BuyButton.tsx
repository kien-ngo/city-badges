import {
    useAddress,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { DirectListing } from "@thirdweb-dev/sdk";
import { useState } from "react";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";

type Props = {
  nft: DirectListing;
};
const BuyButton = (props: Props) => {
  const { nft } = props;
  const address = useAddress();
  const marketplace = useMarketplace(CONTRACTS.MARKETPLACE[CURRENT_CHAIN]);
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const buyNft = async () => {
    if (!address) return alert('Please log in to buy')
    setIsBuying(true);
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        setIsBuying(false);
        switchNetwork && switchNetwork(CONTRACTS.CHAIN_ID[CURRENT_CHAIN]);
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(nft.id, 1);
      alert("NFT bought successfully!");
      setIsBuying(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setIsBuying(false);
    }
  };
  return (
    <button onClick={() => buyNft()}>
      {isBuying
        ? "Loading..."
        : `${nft.buyoutCurrencyValuePerToken.displayValue}
      ${nft.buyoutCurrencyValuePerToken.symbol}`}
    </button>
  );
};

export default BuyButton;
