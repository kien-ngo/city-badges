import Link from "next/link";
import {
  CSSProperties,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
} from "react";
import styles from "../styles/Navbar.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import HamburgerMenu from "./SideMenu";
import { PageName } from "../classes/pages";
type NavBarProps = {
  pageName: PageName;
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment;
};
const currentPageLink: CSSProperties = {
  color: "#333",
  backgroundColor: "white",
};
const NavBar = (props: NavBarProps) => {
  const { pageName } = props;
  return (
    <div className={styles.Navbar}>
      <Link href="/">
        <a className={styles.LogoLink}>
          <img src="/Icon.png" width={40} height={40} />
          <span>City Badges</span>
        </a>
      </Link>
      <Link href="/marketplace">
        <a
          style={pageName === "marketplace" ? currentPageLink : {}}
          className={styles.NavbarLink}
        >
          Marketplace
        </a>
      </Link>
      <Link href="/mint">
        <a
          className={styles.NavbarLink}
          style={pageName === "mint" ? currentPageLink : {}}
        >
          Mint
        </a>
      </Link>
      <Link href="/profile">
        <a
          className={styles.NavbarLink}
          style={pageName === "profile" ? currentPageLink : {}}
        >
          Profile
        </a>
      </Link>
      <span className={styles.LogInBtnContainer}>
        <ConnectWallet />
      </span>
      <HamburgerMenu />
    </div>
  );
};

export default NavBar;
