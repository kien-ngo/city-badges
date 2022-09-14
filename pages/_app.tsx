import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CONTRACTS, CURRENT_CHAIN } from "../utils/contractAddress";
import { ThirdwebProvider } from "@thirdweb-dev/react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      // desiredChainId={CONTRACTS.CHAIN[CURRENT_CHAIN]}
      supportedChains={[CONTRACTS.CHAIN[CURRENT_CHAIN]]}
      chainRpc={{
        [CONTRACTS.CHAIN[CURRENT_CHAIN]]: CONTRACTS.RPC[CURRENT_CHAIN],
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
