import Link from "next/link";
import { JSXElementConstructor, ReactElement, ReactFragment } from "react";
import usePageLoad from "../../hooks/usePageLoad";
import styles from "./Navbar.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
type NavBarProps = {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment;
};

const NavBar = (props: NavBarProps) => {
  const pageLoaded = usePageLoad();
  const router = useRouter();
  return (
    <div id={styles.Navbar}>
      <Link href="/">
        <a
          style={{
            marginTop: "auto",
            marginRight: "40px",
            marginBottom: "auto",
            color: "white",
          }}
        >
          <img src="/icon.png" width={40} height={40} />
        </a>
      </Link>
      {router.pathname !== "/" && (
        <Link href="/">
          <a
            style={{
              marginTop: "auto",
              marginRight: "40px",
              marginLeft: "auto",
              marginBottom: "auto",
              color: "white",
            }}
          >
            Home
          </a>
        </Link>
      )}
      {router.pathname !== "/profile" && (
        <Link href="/profile">
          <a
            style={{
              marginTop: "auto",
              marginRight: "40px",
              marginLeft: "auto",
              marginBottom: "auto",
              color: "white",
            }}
          >
            Profile
          </a>
        </Link>
      )}
      {pageLoaded && (
        <span className={styles.LogInBtnContainer}>
          <ConnectWallet />
        </span>
      )}
    </div>
  );
};

export default NavBar;
