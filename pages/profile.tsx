import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import Container from "../components/Container";
import styles from "../styles/Profile.module.css";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
const NftItem_ = dynamic(() => import("../components/ProfileNftItem"));
const _TransferNftModal = dynamic(
  () => import("../components/TransferNftModal"),
  { ssr: false }
);
const ProfilePage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACTS.MINT[CURRENT_CHAIN]);
  const {
    data: ownedNFTs,
    isLoading,
    error,
  } = useOwnedNFTs(contract?.nft, address);
  const [showMenuId, setShowMenuId] = useState<number>(-1);
  if (!address)
    return (
      <Container pageName="profile">
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Connect your wallet to see stuff
        </p>
      </Container>
    );
  if (isLoading)
    return (
      <Container pageName="profile">
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          Loading stuff. Don&apos;t get impatient
        </p>
      </Container>
    );
  if (!ownedNFTs || !ownedNFTs.length)
    return (
      <Container pageName="profile">
        <p
          style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}
        >
          You don&apos;t own any NFTs and you will never be happy
        </p>
      </Container>
    );
  return (
    <Container pageName="profile">
      <_TransferNftModal />
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      >
        You own {ownedNFTs.length} NFT(s)
        <br />
        On Sale: 0 <br />
        Offer: 0
        <br />
      </div>
      <div className={styles.NftContainer}>
        {!isLoading ? (
          <>
            {ownedNFTs?.map((nft) => (
              <NftItem_
                nft={nft}
                key={nft.metadata.id.toString()}
                showMenuId={showMenuId}
                setShowMenuId={setShowMenuId}
              />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;
