import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SideMenu.module.css";

const toggleSidemenu = () => {
  document.documentElement.classList.toggle("modalOpen");
};

const HamburgerMenu = () => {
  const router = useRouter();
  return (
    <div className={styles.HamburgerMenu}>
      <input
        placeholder="Nothing here - Added to fix SEO"
        id="menu__toggle"
        className={styles.menuToggle}
        type="checkbox"
        onChange={() => toggleSidemenu()}
      />
      <label className={styles.menu__btn} htmlFor="menu__toggle">
        <span></span>
      </label>

      <div className={styles.menu__box}>
        <span className={styles.LogInBtnContainer}>
          <ConnectWallet />
        </span>
        {router.pathname !== "/mint" && (
          <Link href="/mint">
            <a className={styles.SidebarLink}>Mint</a>
          </Link>
        )}
        {router.pathname !== "/marketplace" && (
          <Link href="/marketplace">
            <a className={styles.SidebarLink}>Marketplace</a>
          </Link>
        )}
        {router.pathname !== "/about" && (
          <Link href="/about">
            <a className={styles.SidebarLink}>About</a>
          </Link>
        )}
        {router.pathname !== "/profile" && (
          <Link href="/profile">
            <a className={styles.SidebarLink}>Profile</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
