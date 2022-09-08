import { CityBadgeNft } from "../../NftData/nfts";
import styles from "./NftItem.module.css";
import nft_styles from "../../styles/Nft.module.css";
import NftImage from "../NftImage";
import MintButton from "../MintButton/MintButton";

const NftItem = ({ nft, minted }: { nft: CityBadgeNft; minted: boolean }) => {
  return (
    <div className={nft_styles.NftItem}>
      <NftImage desc={''} url={nft.url} tokenId={nft.id} />
      <div className={nft_styles.Bottom}>
        <div className={nft_styles.NftDesc}>
          {nft.name}
          {/* <br></br>
          <a
            style={{ textDecoration: "undelined", color: "blue" }}
            target="_blank"
            rel="noreferrer"
            href={nft.url}
          >
            View full image
          </a> */}
        </div>
        {!minted ? (
          <MintButton nft={nft} />
        ) : (
          <button className={nft_styles.MintBtn} disabled>
            Minted
          </button>
        )}
      </div>
    </div>
  );
};

export default NftItem;
