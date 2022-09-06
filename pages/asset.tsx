import { useAddress } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
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
import { MINT_CONTRACT_ADDRESS } from "../utils/contractAddress";
import { resolveIPFS } from "../utils/resolveIPFS";
import truncateEthAddress from "../utils/truncateAddress";
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
  const [isMinted, setMintStatus] = useState<boolean>(false);
  const ownedByYou: boolean = ownerAddress === address;
  const [fetchedNft, setFetchedNft] = useState(false);
  const [_tokenId, _setTokenId] = useState<BigNumber | undefined>();
  const fetchNfts = async () => {
    try {
      const response = await fetch(`/api/get-single-nft/${tokenId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: CityBadgeNft = await response.json();
      setNft(data);
      setFetchedNft(true);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMintStatus = async () => {
    try {
      const response = await fetch(`/api/get-mint-status/${tokenId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: NFTMetadataOwner = await response.json();
      const isMinted: boolean = result ? true : false;
      setMintStatus(isMinted);
      const _ownerAddress: string = result ? result.owner : "";
      setOwnerAddress(_ownerAddress);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNfts();
    fetchMintStatus();
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
            width={310}
            height={310}
            alt={nft!.name}
          />
          <div className={styles.Info}>
            <div style={{ fontSize: 30 }}>{nft.name}</div>
            {isMinted && (
              <div>
                {ownedByYou
                  ? "Owned by you"
                  : `Owner: ${truncateEthAddress(ownerAddress)}`}
              </div>
            )}
            <br />
            <br />
            <div>
              <b>Attributes</b>:<br />
              {isMinted && (
                <>
                  Contract:{" "}
                  <a
                    style={{
                      color: "lightcoral",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://snowtrace.io//address/${MINT_CONTRACT_ADDRESS}`}
                  >
                    {truncateEthAddress(MINT_CONTRACT_ADDRESS)}
                  </a>
                  <br />
                  Token ID:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://snowtrace.io//token/${MINT_CONTRACT_ADDRESS}?a=${nft.id}`}
                    style={{
                      color: "lightcoral",
                      textDecoration: "underline",
                    }}
                  >
                    {nft.id}
                  </a>{" "}
                  <br />
                </>
              )}
              City: {nft.city} <br />
              Country: {nft.country} <br />
              Continent: {nft.continent}
            </div>
            <br />
            {ownedByYou && _tokenId && <TransferNftButton tokenId={_tokenId} />}
            {!isMinted && (
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
