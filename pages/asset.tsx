import { useAddress } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CityBadgeNft } from "../classes/nfts";
import Container from "../components/Container";
import MintButton from "../components/MintButton/MintButton";
import TransferNftButton from "../components/TransferNftButton/TransferNftButton";
import usePageLoad from "../hooks/usePageLoad";
import styles from "../styles/Asset.module.css";
import { resolveIPFS } from "../utils/resolveIPFS";
const _TransferNftModal = dynamic(
  () => import("../components/TransferNftModal/TransferNftModal"),
  { ssr: false }
);
const AssetPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const address = useAddress();
  const pageLoad = usePageLoad();
  const [nft, setNft] = useState<CityBadgeNft>();
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const ownedByYou: boolean = ownerAddress === address;
  const [fetchedNft, setFetchedNft] = useState(false);
  const fetchNfts = async () => {
    try {
      const response = await fetch(`/api/get-single-nft/${tokenId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setNft(data.result);
      setOwnerAddress(data.ownerAddress);
      setFetchedNft(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNfts();
  }, [pageLoad]);
  if (!fetchedNft)
    return (
      <Container>
        <p style={{ marginLeft: "auto", marginRight: "auto" }}>Loading...</p>
      </Container>
    );
  if (fetchedNft && !nft)
    return (
      <Container>
        <p style={{ marginLeft: "auto", marginRight: "auto" }}>
          Error: Could not find NFT
        </p>
      </Container>
    );
  if (!nft) return <></>;
  return (
    <Container>
      <_TransferNftModal />
      <div className={styles.Container}>
        <div className={styles.Header}>
          <Image
            src={resolveIPFS(nft.url)}
            width={300}
            height={300}
            alt={nft!.name}
          />
          <div className={styles.Info}>
            <div style={{ fontSize: 30 }}>{nft.name}</div>
            {nft.minted && (
              <div>
                {ownedByYou ? "Owned by you" : "Minted by someone else"}
              </div>
            )}
            <br />
            <br />
            <div>
              <b>Attributes</b>:<br />
              Token ID: {nft.id} <br />
              City: {nft.city} <br />
              Country: {nft.country} <br />
              Continent: {nft.continent}
            </div>
            <br />
            {ownedByYou && <TransferNftButton tokenId={nft!.id} />}
            {!nft.minted && (
              <div>
                Mint: <MintButton nft={nft} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AssetPage;
