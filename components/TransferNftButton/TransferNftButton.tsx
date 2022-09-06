import { BigNumber } from "ethers";
import { MouseEvent } from "react";
import nft_styles from "../../styles/Nft.module.css";

const openTransferNftModal = (e: MouseEvent, tokenId: BigNumber) => {
  e.stopPropagation();
  if (!tokenId) return alert("Error: Missing tokenId");
  const TransferNftModal = document.getElementById(
    "TransferNftModal"
  ) as HTMLElement;
  if (!TransferNftModal) return alert("Error: DOM Missing");
  TransferNftModal.style.display = "flex";
  TransferNftModal.setAttribute("__ti", tokenId.toString());
  document.documentElement.classList.add("modalOpen");
};

const TransferNftButton = ({ tokenId }: { tokenId: BigNumber }) => {
  console.log({ tokenId })
  return (
    <button
      className={nft_styles.MintBtn}
      onClick={(e) => openTransferNftModal(e, tokenId)}
    >
      Transfer
    </button>
  );
};

export default TransferNftButton;
