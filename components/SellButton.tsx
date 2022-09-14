// https://blog.thirdweb.com/guides/nft-marketplace-with-typescript-next/
import {
  useAddress,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { CONTRACTS, CURRENT_CHAIN } from "../data/constants";
type Props = {
  contractAddress: string;
  tokenId: BigNumber;
};
const SellButton = (props: Props) => {
  const { contractAddress, tokenId } = props;
  const address = useAddress();
  const router = useRouter();
  const price_test: number = 1;
  // Connect to our marketplace contract via the useMarketplace hook
  const marketplace = useMarketplace(CONTRACTS.MARKETPLACE[CURRENT_CHAIN]);
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const createListing = async (e: any) => {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(CONTRACTS.CHAIN_ID[CURRENT_CHAIN]);
        return;
      }
      // Prevent page from refreshing
      e.preventDefault();
      // For Direct Listings:
      const transactionResult = await marketplace?.direct.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price_test, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        console.log(transactionResult);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={(e) => createListing(e)}>Sell</button>;
};

export default SellButton;
