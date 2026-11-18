import Image from "next/image";
import Link from "next/link";
import logo from "./assets/dynity-logo.png";

export const islandUrl = "/products/island-survival/";
export const islandSupportUrl = `${islandUrl}#support`;
export const islandPrivacyUrl = "https://sites.google.com/view/dynity-legal/";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要內容</a>
      <header className="site-header" id="top">
        <div className="frame header-inner">
          <Link className="wordmark" href="/" aria-label="Dynity 首頁" translate="no">
            <Image src={logo} alt="" />
          </Link>
          <nav aria-label="主要導覽">
            <Link href={islandUrl}>產品</Link>
            <Link href="/about/">關於</Link>
            <Link href={islandSupportUrl}>支援</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="frame footer-inner">
        <div>
          <Link className="wordmark" href="/" aria-label="Dynity 首頁" translate="no">
            <Image src={logo} alt="" />
          </Link>
          <p>軟體開發團隊</p>
        </div>
        <nav aria-label="頁尾導覽">
          <Link href={islandUrl}>孤島求生</Link>
          <Link href="/about/">關於 Dynity</Link>
          <Link href={islandSupportUrl}>產品支援</Link>
          <a href={islandPrivacyUrl}>隱私權政策</a>
          <a href="#top">回到頂端 <span aria-hidden="true">↑</span></a>
        </nav>
      </div>
    </footer>
  );
}
