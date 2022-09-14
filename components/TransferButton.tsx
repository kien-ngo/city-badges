import { useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { MouseEvent } from "react";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";

const openTransferNftModal = (e: MouseEvent, tokenId: BigNumber) => {
  const TransferNftModal = document.getElementById(
    "TransferNftModal"
  ) as HTMLElement;
  if (!TransferNftModal) return alert("Error: DOM Missing");
  TransferNftModal.style.display = "flex";
  TransferNftModal.setAttribute("__ti", tokenId.toString());
  document.documentElement.classList.add("modalOpen");
};

const TransferNftButton = ({ tokenId }: { tokenId: BigNumber }) => {
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const onClickTransferButton = async (e: MouseEvent, tokenId: BigNumber) => {
    e.stopPropagation();
    if (!tokenId) return alert("Error: Missing tokenId");
    if (networkMismatch) {
      switchNetwork && switchNetwork(CONTRACTS.CHAIN_ID[CURRENT_CHAIN]);
      return;
    }
    openTransferNftModal(e, tokenId);
  };
  return (
    <button onClick={(e) => onClickTransferButton(e, tokenId)}>Transfer</button>
  );
};

export default TransferNftButton;
