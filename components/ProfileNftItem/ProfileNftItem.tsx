import { NFT, useAddress } from "@thirdweb-dev/react";
import { Erc721 } from "@thirdweb-dev/sdk";
import { BaseERC721 } from "@thirdweb-dev/sdk/dist/declarations/src/types/eips";
import Image from "next/image";
import { useRouter } from "next/router";
import { resolveIPFS } from "../../utils/resolveIPFS";
import styles from "./ProfileNftItem.module.css";
const ProfileNftItem = ({ nft }: { nft: NFT<Erc721<BaseERC721>> }) => {
  const address = useAddress();
  const router = useRouter();
  // Get the NFT collection using its contract address
  return (
    <div className={styles.NftItem}>
      <Image
        alt={nft.metadata.description || ""}
        src={resolveIPFS(nft.metadata.image!)}
        width={256}
        height={256}
        loading="lazy"
        priority={false}
      ></Image>
      <div className={styles.Bottom}>
        <div className={styles.NftDesc}>
          {nft.metadata.name}
        </div>
        {router.pathname === "/profile" && (
          <button className={styles.MintBtn}>Transfer</button>
        )}
      </div>
    </div>
  );
};

export default ProfileNftItem;
