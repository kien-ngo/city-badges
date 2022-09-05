const PUBLIC_GATEWAY: string = "https://gateway.ipfscdn.io/ipfs/";
const CLOUDFLARE_GATEWAY: string = "https://cloudflare-ipfs.com/ipfs/";

export const resolveIPFS = (url: string): string => {
  if (!url) {
    return url;
  }

  if (!url.includes("ipfs://") || !url) {
    return url;
  }

  return url.replace("ipfs://", PUBLIC_GATEWAY);
};
