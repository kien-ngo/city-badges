import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/Profile.module.css";
import { CONTRACT_ADDRESS } from "../utils/contractAddress";
const NftItem_ = dynamic(
  () => import("../components/ProfileNftItem/ProfileNftItem")
);
const ProfilePage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const {
    data: ownedNFTs,
    isLoading,
    error,
  } = useOwnedNFTs(contract?.nft, address);
  if (!address)
    return (
      <Container>
        <h1>Connect your wallet to see stuff</h1>
      </Container>
    );
  if (isLoading)
    return (
      <Container>
        <h1>Loading stuff. Don&apos;t get impatient</h1>
      </Container>
    );
  if (!ownedNFTs || !ownedNFTs.length)
    return (
      <Container>
        <h1>You don&apos;t own any NFTs and you will never be happy</h1>
      </Container>
    );
  return (
    <Container>
      <div className={styles.NftContainer}>
        {!isLoading ? (
          <>
            {ownedNFTs?.map((nft) => (
              <NftItem_ nft={nft} key={nft.metadata.id.toString()} />
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
