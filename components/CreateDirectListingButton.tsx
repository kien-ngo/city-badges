// https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/
import { useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
import { MouseEvent } from "react";

type Props = {
  tokenId: BigNumber;
};

const openDirectListingModal = (e: MouseEvent, tokenId: BigNumber) => {
  const DirectListingModal = document.getElementById(
    "DirectListingModal"
  ) as HTMLElement;
  if (!DirectListingModal) return alert("Error: DOM Missing");
  DirectListingModal.style.display = "flex";
  DirectListingModal.setAttribute("__ti", tokenId.toString());
  document.documentElement.classList.add("modalOpen");
};

const CreateDirectListingButton = (props: Props) => {
  const { tokenId } = props;
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const onClickSellButton = async (e: MouseEvent) => {
    e.stopPropagation();
    if (networkMismatch) {
      switchNetwork && switchNetwork(CONTRACTS.CHAIN_ID[CURRENT_CHAIN]);
      return;
    }
    openDirectListingModal(e, tokenId);
  };
  return <button onClick={(e) => onClickSellButton(e)}>Sell</button>;
};

export default CreateDirectListingButton;
