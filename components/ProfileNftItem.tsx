import { NFT } from "@thirdweb-dev/react";
import { Erc721 } from "@thirdweb-dev/sdk";
import { BaseERC721 } from "@thirdweb-dev/sdk/dist/declarations/src/types/eips";
import styles from "../styles/ProfileNftItem.module.css";
import nft_styles from "../styles/Nft.module.css";
import NftImage from "./NftImage";
import dynamic from "next/dynamic";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
const _TransferButton = dynamic(() => import("./TransferButton"));
const _SellButton = dynamic(() => import("./SellButton"));
type Props = {
  nft: NFT<Erc721<BaseERC721>>;
  showMenuId: number;
  setShowMenuId: Function;
};
const ProfileNftItem = ({ nft, showMenuId, setShowMenuId }: Props) => {
  // @ts-expect-error
  const tokenId: number = nft.metadata.attributes!.id;
  return (
    <div className={nft_styles.NftItem} style={{ position: "relative" }}>
      <NftImage
        desc={nft.metadata.description!}
        url={nft.metadata.image!}
        id={tokenId}
      />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>{nft.metadata.name}</div>
        {showMenuId === tokenId && (
          <div className={styles.MenuButton}>
            <_SellButton
              tokenId={nft.metadata.id}
              contractAddress={CONTRACTS.MINT[CURRENT_CHAIN]}
            />
            <_TransferButton tokenId={nft.metadata.id} />
            <button onClick={() => setShowMenuId(-1)} style={{ color: "red" }}>
              Close menu
            </button>
          </div>
        )}
        <button onClick={() => setShowMenuId(tokenId)}>Menu</button>
      </div>
    </div>
  );
};

export default ProfileNftItem;
