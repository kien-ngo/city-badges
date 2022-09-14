import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { getThirdWebSdk } from "../../utils/getThirdWebSdk";

const EUVAContract: string = "0xC185812AcCBA12ca0Fb9eB1c7c50fEc556734b32";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(400).json({ message: "Invalid request" });
  const thirdwebSdk: ThirdwebSDK = getThirdWebSdk(false);
  const nftCollectionAddress = EUVAContract;
  const nftCollection = thirdwebSdk.getNFTCollection(nftCollectionAddress);
  const response = await nftCollection?.transfer('0x9Ce83A00655347E8be09EEF91a9D08387eBF18Dc', 0)
  res.status(201).json({
    receipt: response?.receipt,
  });
}
