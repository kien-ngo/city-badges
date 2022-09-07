import { NFT } from "@thirdweb-dev/react";
import { Erc721 } from "@thirdweb-dev/sdk";
import { BaseERC721 } from "@thirdweb-dev/sdk/dist/declarations/src/types/eips";
import styles from "./ProfileNftItem.module.css";
import nft_styles from "../../styles/Nft.module.css";
import NftImage from "../NftImage";
import TransferNftButton from "../TransferNftButton/TransferNftButton";

const ProfileNftItem = ({ nft }: { nft: NFT<Erc721<BaseERC721>> }) => {
  // @ts-expect-error
  const tokenId: number = nft.metadata.attributes!.id;
  return (
    <div className={nft_styles.NftItem}>
      <NftImage
        desc={nft.metadata.description!}
        url={nft.metadata.image!}
        tokenId={tokenId}
      />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>{nft.metadata.name}</div>
        <TransferNftButton tokenId={nft.metadata.id} />
      </div>
    </div>
  );
};

export default ProfileNftItem;
