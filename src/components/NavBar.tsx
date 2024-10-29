import Link from "next/link";
import variables from "../../styles/variables.module.scss";

export const NavBar = () => {
  return (
    <div className={variables.NavBar}>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/media">Media</Link>
      <Link href="/characters">Characters</Link>
      <Link href="/customizer">Character Creator Demo</Link>
    </div>
  );
};
