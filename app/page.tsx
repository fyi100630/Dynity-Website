import Image from "next/image";
import logo from "./assets/dynity-logo.png";
import islandScene from "./assets/island-scene.webp";
import islandFocus from "./assets/island-focus.webp";
import islandTown from "./assets/island-town.webp";
import { StoryMotion } from "./story-motion";

const sceneSizes = "(max-width: 720px) calc(100vw - 40px), (max-width: 1400px) 48vw, 650px";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要內容</a>
      <header className="site-header frame" id="top">
        <a className="wordmark" href="#top" aria-label="Dynity 首頁" translate="no">
          <Image src={logo} alt="" sizes="136px" />
        </a>
        <nav aria-label="主要導覽">
          <a href="#projects">作品</a>
          <a href="#about">關於</a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <div className="story frame" data-story>
          <StoryMotion />
          <section className="hero split" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title">把想法做成<br />可用的軟體</h1>
              <p className="intro">Dynity 是一個軟體開發團隊。第一個專案《孤島求生》從每天的專注時間出發。</p>
              <a className="action" href="#projects">
                探索作品 <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-visual" data-story-origin aria-hidden="true">
              <div className="artwork hero-artwork" data-story-artwork>
                <Image src={islandScene} sizes={sceneSizes} alt="" preload />
              </div>
            </div>
          </section>

          <section className="projects" id="projects" aria-labelledby="projects-title">
            <div className="project-feature split">
              <div className="project-copy">
                <p className="overline">第一個專案 <span>Android</span></p>
                <h2 id="projects-title">孤島求生</h2>
                <p className="project-name-en" lang="en" translate="no">Island Survival</p>
                <p className="intro">完成一段專注，回到島上領取金幣、解鎖建築，把一小塊土地慢慢蓋成自己的城鎮。</p>
                <p className="project-status">目前在 Google Play 封閉測試</p>
              </div>
              <div className="project-visual" data-story-destination aria-hidden="true">
                <div className="artwork" data-story-fallback>
                  <Image src={islandScene} sizes={sceneSizes} alt="" />
                </div>
              </div>
            </div>

            <div className="project-details">
              <article className="feature" aria-labelledby="focus-title">
                <div className="feature-copy">
                  <h3 id="focus-title">留一段時間專注</h3>
                  <p>選好計時長度和容易分心的 App。開啟封鎖模式後，專注期間會顯示封印畫面。</p>
                </div>
                <Image
                  className="screenshot"
                  src={islandFocus}
                  sizes="(max-width: 720px) 164px, 205px"
                  alt="專注計時畫面，顯示倒數進度圈與暫停按鈕"
                />
              </article>
              <article className="feature" aria-labelledby="town-title">
                <div className="feature-copy">
                  <h3 id="town-title">把小島蓋成城鎮</h3>
                  <p>從一小塊土地開始，用專注取得的獎勵建造房屋，沿著島的邊緣繼續開拓。</p>
                </div>
                <Image
                  className="screenshot"
                  src={islandTown}
                  sizes="(max-width: 720px) 164px, 205px"
                  alt="發展後的等角島嶼，有道路、住宅和成片的建築"
                />
              </article>
            </div>
          </section>
        </div>

        <section className="about frame" id="about" aria-labelledby="about-title">
          <h2 id="about-title">關於 <span lang="en" translate="no">Dynity</span></h2>
          <p>我們主要開發軟體產品。《孤島求生》是 Dynity 的第一個專案。</p>
        </section>
      </main>

      <footer className="site-footer frame">
        <Image className="footer-logo" src={logo} alt="Dynity" sizes="112px" />
        <div className="footer-links">
          <a href="https://github.com/fyi100630/Dynity-Website">GitHub <span aria-hidden="true">↗</span></a>
          <a href="#top">回到頂端 <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
