import type { NextPage } from "next";
import Link from "next/link";
import Container from "../components/Container";
import styles from "../styles/Home.module.css";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";

const Home: NextPage = () => {
  return (
    <Container pageName='home'>
      <p style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}>
        City Badges is an image collection of cities around the world. The NFTs
        are generated by DALL-E and live on the <b>{CURRENT_CHAIN}</b> blockchain.
        <br />
        <br />
        <Link href="/mint">
          <a className={styles.LinkTest}>Mint Now!</a>
        </Link>
        <br />
        <Link href="/mint">
          <a className={styles.LinkTest}>Marketplace</a>
        </Link>
        <br />
        <br />
        Front-end Built with Next JS and smart contracts are pre-built and
        audited by Thirdweb
        <br />
        <br />
        <span>
          <b>Mint Contract address:</b> {CONTRACTS.MINT[CURRENT_CHAIN]}
        </span>
        <br />
        <a
          style={{ color: "blue" }}
          href={`${CONTRACTS.EXPLORER[CURRENT_CHAIN]}/address/${CONTRACTS.MINT[CURRENT_CHAIN]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link: {CONTRACTS.EXPLORER[CURRENT_CHAIN]}/address/
          {CONTRACTS.MINT[CURRENT_CHAIN]}
        </a>
        <br />
        <br />
        <span>
          <b>Marketplace Contract address:</b>{" "}
          {CONTRACTS.MARKETPLACE[CURRENT_CHAIN]}
        </span>
        <br />
        <a
          style={{ color: "blue" }}
          href={`${CONTRACTS.EXPLORER[CURRENT_CHAIN]}/address/${CONTRACTS.MARKETPLACE[CURRENT_CHAIN]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link: {CONTRACTS.EXPLORER[CURRENT_CHAIN]}/address/
          {CONTRACTS.MARKETPLACE[CURRENT_CHAIN]}
        </a>
      </p>
    </Container>
  );
};

export default Home;
