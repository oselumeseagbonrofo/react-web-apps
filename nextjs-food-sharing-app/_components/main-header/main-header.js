import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";
import GradientHeader from "./gradient-header";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <GradientHeader />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image
            alt="A plate with food on it"
            priority
            src={logoImg}
            width={50}
            height={50}
          />
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
