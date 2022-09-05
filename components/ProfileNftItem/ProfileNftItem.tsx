import { NFT, useContract } from "@thirdweb-dev/react";
import { Erc721 } from "@thirdweb-dev/sdk";
import { BaseERC721 } from "@thirdweb-dev/sdk/dist/declarations/src/types/eips";
import { CONTRACT_ADDRESS } from "../../utils/contractAddress";
import styles from "./ProfileNftItem.module.css";
import nft_styles from "../../styles/Nft.module.css";
import NftImage from "../NftImage";
import { MouseEvent } from "react";
import { BigNumberish } from "ethers";

const openTransferNftModal = (e: MouseEvent, tokenId: BigNumberish) => {
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

const ProfileNftItem = ({ nft }: { nft: NFT<Erc721<BaseERC721>> }) => {
  return (
    <div className={nft_styles.NftItem}>
      <NftImage
        desc={nft.metadata.description!}
        url={nft.metadata.image!}
        tokenId={nft.metadata.id.toNumber()}
      />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>{nft.metadata.name}</div>
        <button
          className={nft_styles.MintBtn}
          onClick={(e) => openTransferNftModal(e, nft.metadata.id)}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default ProfileNftItem;
