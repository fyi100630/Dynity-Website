import type { ComponentProps } from "react";
import { featuredProject, islandProject, projectPath } from "./projects";
import { githubUrl } from "./site-config";

const navigation = [
  { label: "作品", href: "/work/" },
  { label: "關於", href: "/about/" },
  { label: "聯絡", href: "/contact/" },
];

export function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  // Static routes let the browser restore scroll after the destination document has laid out.
  return <a {...props} href={`${process.env.PAGES_BASE_PATH ?? ""}${href}`} />;
}

export function Wordmark() {
  return <span className="wordmark" lang="en" translate="no">dynity<span>.</span></span>;
}

export function Arrow({ direction = "right" }: { direction?: "right" | "down" | "up" | "external" }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true" />;
}

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要內容</a>
      <header className="site-header" id="top">
        <div className="shell header-inner">
          <SiteLink className="header-brand" href="/" aria-label="Dynity 首頁">
            <span className="header-mark-slot" data-header-slot>
              <span className="header-wordmark" data-header-wordmark><Wordmark /></span>
            </span>
          </SiteLink>
          <nav aria-label="主要導覽">
            {navigation.map(({ label, href }) => <SiteLink href={href} key={href}>{label}</SiteLink>)}
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-main">
          <div>
            <SiteLink className="footer-brand" href="/" aria-label="Dynity 首頁"><Wordmark /></SiteLink>
            <p>獨立軟體開發團隊</p>
          </div>
          <nav aria-label="頁尾導覽">
            <SiteLink href={projectPath(featuredProject)}>{featuredProject.name}</SiteLink>
            <SiteLink href="/about/">關於 Dynity</SiteLink>
            <SiteLink href="/contact/">聯絡我們</SiteLink>
            <a href={githubUrl}>GitHub <Arrow direction="external" /></a>
          </nav>
        </div>
        <div className="footer-end">
          <div className="footer-legal">
            <a href={islandProject.support.privacy}>孤島求生隱私權政策</a>
            <a href={islandProject.support.terms}>服務條款</a>
          </div>
          <a href="#top">回到頂端 <Arrow direction="up" /></a>
        </div>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
