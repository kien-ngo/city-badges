import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const getThirdWebSdk = (readonly:boolean = true) => {
    if (readonly) return new ThirdwebSDK("avalanche");
    return ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, "avalanche");
}