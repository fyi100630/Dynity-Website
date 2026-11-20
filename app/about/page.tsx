import { SiteLink } from "../site";
import { islandProject, projectPath } from "../projects";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata("認識 Dynity 團隊", "Dynity 是由 CC 和 Eric 兩位高中生組成的獨立軟體開發團隊。我們一起做 App、遊戲和日常工具。", "/about/");

export default function AboutPage() {
  return (
    <>
      <section className="about-intro ink-section" aria-labelledby="about-title">
        <div className="shell">
          <h1 className="display about-display" id="about-title">我們是 <span lang="en" translate="no">Dynity</span></h1>
          <p className="about-copy">我們是 CC 和 Eric，兩個喜歡做軟體的高中生。Dynity 是我們一起做作品的名字。遇到一件麻煩的小事，或想到一個自己很想玩的遊戲，我們就想動手試試看。</p>
        </div>
      </section>
      <section className="shell about-article" aria-labelledby="team-members-title">
        <h2 className="display sub-title" id="team-members-title">團隊成員</h2>
        <ul className="team-members" role="list" lang="en" translate="no">
          <li>CC</li>
          <li>Eric</li>
        </ul>
      </section>
      <section className="studio-notes detail-section" aria-labelledby="studio-notes-title">
        <div className="shell">
          <h2 className="display sub-title" id="studio-notes-title">我們怎麼做作品</h2>
          <ul className="editorial-list" role="list">
            <li>
              <h3>從自己也遇過的問題出發</h3>
              <p className="body-copy">我們選題時會先問，這個點子會在哪個時刻派上用場？《孤島求生》的答案是想專心讀書或工作、卻習慣拿起手機的那一刻。</p>
            </li>
            <li>
              <h3>把第一次使用的路走一遍</h3>
              <p className="body-copy">我們在意打開 App 之後，能不能馬上開始做原本想做的事。以《孤島求生》為例，第一次可以先用訪客模式。想備份進度或和朋友一起玩時，再登入帳號。</p>
            </li>
            <li>
              <h3>聽聽大家在哪一步卡住</h3>
              <p className="body-copy">畫面上的一個詞或多一步操作，都可能讓人停下來。我們想知道真正用起來是什麼感覺，所以在《孤島求生》裡留了回報問題和建議的入口。</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="shell about-article" aria-labelledby="about-article-title">
        <h2 className="display sub-title" id="about-article-title">從作品或回饋認識我們</h2>
        <div>
          <p className="body-copy">《孤島求生》是我們的第一個作品。如果你也遇過相似的問題，歡迎看看產品怎麼用，也歡迎把你的使用感受告訴我們。</p>
          <div className="actions">
            <SiteLink href={projectPath(islandProject)} className="text-link">看看《孤島求生》</SiteLink>
            <SiteLink href="/contact/" className="text-link">回報問題或分享建議</SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
