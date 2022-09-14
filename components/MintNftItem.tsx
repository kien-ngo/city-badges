import { CityBadgeNft } from "../data/nfts";
import NftImage from "./NftImage";
import nft_styles from "../styles/Nft.module.css";
import dynamic from "next/dynamic";
const _MintButton = dynamic(() => import("./MintButton"));

const NftItem = ({ nft, minted }: { nft: CityBadgeNft; minted: boolean }) => {
  return (
    <div className={nft_styles.NftItem}>
      <NftImage desc={""} url={nft.url} id={nft.id} />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>{nft.name}</div>
        {!minted ? <_MintButton nft={nft} /> : <button disabled>Minted</button>}
      </div>
    </div>
  );
};

export default NftItem;
