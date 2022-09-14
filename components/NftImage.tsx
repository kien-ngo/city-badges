import Link from "next/link";
import Image from "next/future/image";
import { resolveIPFS } from "../utils/resolveIPFS";

const NftImage = ({
  desc,
  url,
  id,
}: {
  desc: string;
  url: string;
  id: number;
}) => {
  return (
    <Link href={{ pathname: "/asset", query: { id: id } }} prefetch={false}>
      <a>
        {/* <div style={{ width: 256, height: 256, overflow: "hidden" }}> */}
        <Image
          alt={desc}
          src={resolveIPFS(url)}
          width={256}
          height={256}
          loading="lazy"
          priority={false}
        ></Image>
        {/* </div> */}
      </a>
    </Link>
  );
};

export default NftImage;
