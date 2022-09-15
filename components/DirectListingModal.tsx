import { useMarketplace } from "@thirdweb-dev/react";
import { useState } from "react";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
import backdropStyle from "../styles/backdrop.module.css";
import styles from "../styles/DirectListingModal.module.css";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

const closeDirectListingModal = () => {
  document.documentElement.classList.remove("modalOpen");
  const modal = document.getElementById("DirectListingModal") as HTMLElement;
  modal.setAttribute("__ti", "");
  if (modal) modal.style.display = "none";
  const input = document.getElementById(
    "listingPriceInput"
  ) as HTMLInputElement;
  if (input) input.value = "";
};

const DirectListingModal = () => {
  const [sellPrice, setSellPrice] = useState<number>(-1);
  const marketplace = useMarketplace(CONTRACTS.MARKETPLACE[CURRENT_CHAIN]);

  const createListing = async (e: any) => {
    try {
      e.stopPropagation();
      if (sellPrice <= 0) return alert("Invalid selling price");
      const DirectListingModal = document.getElementById(
        "DirectListingModal"
      ) as HTMLElement;
      const tokenId: number = Number(DirectListingModal.getAttribute("__ti"));
      if (!tokenId) return alert("Could not find tokenId!");
      // For Direct Listings:
      const transactionResult = await marketplace?.direct.createListing({
        assetContractAddress: CONTRACTS.MINT[CURRENT_CHAIN],
        buyoutPricePerToken: sellPrice,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        listingDurationInSeconds: 31_540_000, // a year
        quantity: 1,
        startTimestamp: new Date(0),
        tokenId: tokenId,
      });
      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        console.log(transactionResult);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      id="DirectListingModal"
      className={backdropStyle.backdrop}
      onClick={() => closeDirectListingModal()}
    >
      <div className={styles.Content}>
        <div>
          <label htmlFor="">
            Listing Price ({CONTRACTS.SYMBOL[CURRENT_CHAIN]})
          </label>
          <input
            id="listingPriceInput"
            type="number"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => setSellPrice(Number(e.target.value))}
          />
        </div>
        <button onClick={(e) => createListing(e)}>Create Listing</button>
      </div>
    </div>
  );
};

export default DirectListingModal;
