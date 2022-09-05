import Link from "next/link";
import { JSXElementConstructor, ReactElement, ReactFragment } from "react";
import styles from "./Navbar.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import HamburgerMenu from "../SideMenu/SideMenu";
type NavBarProps = {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment;
};

const NavBar = (props: NavBarProps) => {
  const router = useRouter();
  return (
    <div className={styles.Navbar}>
      <Link href="/">
        <a className={styles.LogoLink}>
          <img src="/Icon.png" width={40} height={40} />
          <span>City Badges</span>
        </a>
      </Link>
      {router.pathname !== "/marketplace" && (
        <Link href="/marketplace">
          <a className={styles.NavbarLink}>Marketplace</a>
        </Link>
      )}
      {router.pathname !== "/about" && (
        <Link href="/about">
          <a className={styles.NavbarLink}>About</a>
        </Link>
      )}
      {router.pathname !== "/profile" && (
        <Link href="/profile">
          <a className={styles.NavbarLink}>Profile</a>
        </Link>
      )}
      <span className={styles.LogInBtnContainer}>
        <ConnectWallet />
      </span>
      <HamburgerMenu />
    </div>
  );
};

export default NavBar;
