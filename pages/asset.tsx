import { useAddress } from "@thirdweb-dev/react";
import { NFTMetadataOwner, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CityBadgeNft, NFTs } from "../NftData/nfts";
import Container from "../components/Container";
import MintButton from "../components/MintButton/MintButton";
import TransferNftButton from "../components/TransferNftButton/TransferNftButton";
import usePageLoad from "../hooks/usePageLoad";
import styles from "../styles/Asset.module.css";
import { MINT_CONTRACT_ADDRESS } from "../utils/contractAddress";
import { resolveIPFS } from "../utils/resolveIPFS";
import truncateEthAddress from "../utils/truncateAddress";
import { getThirdWebSdk } from "../utils/getThirdWebSdk";
import { getMintedNfts } from "../utils/getMintedNfts";
const _TransferNftModal = dynamic(
  () => import("../components/TransferNftModal/TransferNftModal"),
  { ssr: false }
);
const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(true);
const AssetPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const address = useAddress();
  const { pageLoaded, isPageLoading } = usePageLoad();
  const nft: CityBadgeNft | undefined = NFTs.find(
    (nft) => nft.id == Number(tokenId)
  );
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [isMinted, setMintStatus] = useState<boolean>(false);
  const ownedByYou: boolean = ownerAddress === address;
  const [_tokenId, _setTokenId] = useState<BigNumber | undefined>();

  // Fetch the current NFTs in the collection
  const fetchMintedNft = async () => {
    const mintedNfts: NFTMetadataOwner[] = await getMintedNfts(thirdwebSdk);
    const result: NFTMetadataOwner | undefined = mintedNfts.find(
      // @ts-expect-error
      (nft) => nft.metadata.attributes.id == Number(tokenId)
    );
    if (result) {
      setMintStatus(true);
      setOwnerAddress(result.owner);
    }
  };
  useEffect(() => {
    fetchMintedNft();
  }, []);
  if (isPageLoading)
    return (
      <Container>
        <p>Loading ...</p>
      </Container>
    );
  if (!nft)
    return (
      <Container>
        <p>Could not find tokenId: {tokenId}</p>
      </Container>
    );
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
                {ownedByYou && ownerAddress ? (
                  <>Owned by you</>
                ) : (
                  <a
                    href={`https://snowtrace.io/address/${ownerAddress}`}
                    style={{
                      color: "lightcoral",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Owner: {truncateEthAddress(ownerAddress)}
                  </a>
                )}
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
