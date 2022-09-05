import { useContract } from "@thirdweb-dev/react";
import { useState } from "react";
import backdropStyle from "../../styles/backdrop.module.css";
import { MINT_CONTRACT_ADDRESS } from "../../utils/contractAddress";
import { MouseEvent } from "react";
import styles from "./TransferNftModal.module.css";
import { isAddress } from "ethers/lib/utils";

const closeTransferNftModal = () => {
  document.documentElement.classList.remove("modalOpen");
  const modal = document.getElementById("TransferNftModal") as HTMLElement;
  modal.setAttribute("__ti", "");
  if (modal) modal.style.display = "none";
  const input = document.getElementById(
    "deliveryAddressInput"
  ) as HTMLInputElement;
  if (input) input.value = "";
};

const TransferNftModal = () => {
  const { contract } = useContract(MINT_CONTRACT_ADDRESS);
  const [receiveAddress, setReceiveAddress] = useState<string>("");
  const transferNft = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!receiveAddress) return alert("Need a destination!");
    if (receiveAddress.length !== 42) return alert("EVM address is invalid");
    if (!isAddress(receiveAddress))
      return alert("Not a proper address (could be a contract address");
    const TransferNftModal = document.getElementById(
      "TransferNftModal"
    ) as HTMLElement;
    const tokenId: number = Number(TransferNftModal.getAttribute("__ti"));
    if (!tokenId) return alert("Could not find tokenId!");
    await contract!.nft!.transfer(receiveAddress, tokenId);
  };
  return (
    <div
      id="TransferNftModal"
      className={backdropStyle.backdrop}
      onClick={() => closeTransferNftModal()}
    >
      <div className={styles.Content}>
        <input
          id="deliveryAddressInput"
          type="text"
          placeholder="Delivery address: 0x..."
          onClick={(e) => {
            e.stopPropagation();
          }}
          maxLength={42}
          size={45}
          onChange={(e) => setReceiveAddress(e.target.value)}
        />
        <button onClick={(e) => transferNft(e)} disabled={!receiveAddress}>
          Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferNftModal;
