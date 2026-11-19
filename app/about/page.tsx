import { SiteLink, Arrow } from "../site";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata("關於 Dynity", "Dynity 是一個小型獨立軟體開發團隊。我們從日常想用的東西出發，把點子做成軟體、遊戲與工具。", "/about/");

export default function AboutPage() {
  return (
    <>
      <section className="about-intro ink-section" aria-labelledby="about-title">
        <div className="shell">
          <p className="section-label">關於 Dynity</p>
          <h1 className="display about-display" id="about-title" lang="en">Small ideas.<br />Real things.</h1>
        </div>
      </section>
      <section className="shell about-article" aria-labelledby="about-article-title">
        <h2 className="display sub-title" id="about-article-title">把想用的東西做出來。</h2>
        <div>
          <p className="body-copy">Dynity 是一個小型獨立軟體開發團隊。我們喜歡從日常的小事開始，做一個自己會想打開的 App、一款想多玩一會兒的遊戲，或一個省下一點時間的工具。</p>
          <p className="body-copy">《孤島求生》的起點是想少滑一點手機。我們想，專注過後如果能回到一座自己的島，蓋下一棟房子，下一次想專心時，或許就會期待再打開它。</p>
          <SiteLink href="/work/" className="text-link">探索作品 <Arrow /></SiteLink>
        </div>
      </section>
    </>
  );
}
