import { useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { Marketplace } from "@thirdweb-dev/sdk";
import { useState } from "react";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
type Props = {
  listingId: string;
  marketplace: Marketplace;
};
const CancelDirectListingButton = (props: Props) => {
  const { listingId, marketplace } = props;
  const [cancelled, setCancelled] = useState<boolean>(false);
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const cancelListing = async () => {
    try {
      if (networkMismatch) {
        switchNetwork && switchNetwork(CONTRACTS.CHAIN_ID[CURRENT_CHAIN]);
        return;
      }
      setIsCancelling(true);
      const tx = await marketplace!.direct.cancelListing(listingId);
      console.log("cancel tx: ", tx);
      if (tx.receipt.status === 1) setCancelled(true);
      setIsCancelling(false);
    } catch (error) {
      setIsCancelling(false);
      console.error(error);
      alert(error);
    }
  };
  if (!listingId || cancelled) return <></>;
  return (
    <button style={{ color: "red" }} onClick={() => cancelListing()}>
      {isCancelling ? "Cancelling..." : "Cancel listing"}
    </button>
  );
};

export default CancelDirectListingButton;
