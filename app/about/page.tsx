import { SiteLink, Arrow } from "../site";
import { islandProject, projectPath } from "../projects";
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
          <SiteLink href="/work/" className="text-link">探索作品 <Arrow /></SiteLink>
        </div>
      </section>
      <section className="studio-notes detail-section" aria-labelledby="studio-notes-title">
        <div className="shell">
          <h2 className="display sub-title" id="studio-notes-title">一個想法怎麼變成作品</h2>
          <ul className="editorial-list" role="list">
            <li>
              <h3>從一個熟悉的問題開始</h3>
              <p className="body-copy">想認真讀完一章書，手機一亮，就順手花了十幾分鐘。這是《孤島求生》的起點。我們想做一個願意每天打開的專注工具，於是把計時和島嶼經營放在一起。</p>
            </li>
            <li>
              <h3>讓專注時間留下看得見的東西</h3>
              <p className="body-copy">一次計時換來一點金幣和經驗，一次次累積，才有了第一間房子和下一條路。打開島嶼時，你能看到那些時間最後長成什麼樣子。</p>
            </li>
            <li>
              <h3>把怎麼用說清楚</h3>
              <p className="body-copy">第一次打開 App，可以用訪客模式先玩。想封印分心的 App 時，再決定是否授權。作品介紹整理了每一步，方便你先看過再決定。</p>
            </li>
          </ul>
          <SiteLink href={projectPath(islandProject)} className="text-link">看看《孤島求生》</SiteLink>
        </div>
      </section>
    </>
  );
}
