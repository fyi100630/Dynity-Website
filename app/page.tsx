import Image from "next/image";
import { StoryMotion } from "./story-motion";

const continuum = {
  src: "/continuum.webp",
  width: 1024,
  height: 1024,
  sizes: "(max-width: 720px) calc(100vw - 40px), (max-width: 1400px) 48vw, 650px",
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要內容</a>
      <header className="site-header frame" id="top">
        <a className="wordmark" href="#top" aria-label="Dynity 首頁" translate="no">
          <span className="brand-mark" aria-hidden="true" />
          Dynity
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
              <p className="overline" lang="en">Independent Digital Design</p>
              <h1 id="hero-title" lang="en">Ideas in<br />Motion.</h1>
              <p className="intro">用設計與動態，讓抽象的想法變成可以探索的數位體驗。</p>
              <a className="action" href="#projects">
                探索作品 <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-visual" data-story-origin aria-hidden="true">
              <div className="artwork hero-artwork" data-story-artwork>
                <Image {...continuum} alt="" preload />
              </div>
            </div>
          </section>

          <section className="projects" id="projects" aria-labelledby="projects-title">
            <div className="project-feature split">
              <div className="project-copy">
                <p className="overline" lang="en">Projects</p>
                <h2 id="projects-title" lang="en">Selected <br />Work.</h2>
                <article aria-labelledby="continuum-title">
                  <p className="project-type">動態設計 · 概念作品</p>
                  <h3 id="continuum-title" lang="en" translate="no">Continuum</h3>
                  <p>一條連續的緞帶穿過自身。用同一件物體的位移與尺度變化，把兩個畫面接在一起。</p>
                </article>
              </div>
              <div className="project-visual" data-story-destination aria-hidden="true">
                <div className="artwork" data-story-fallback>
                  <Image {...continuum} alt="" />
                </div>
              </div>
            </div>

            <article className="project-secondary" aria-labelledby="strata-title">
              <div className="artwork secondary-artwork">
                <Image
                  src="/strata.webp"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 720px) calc(100vw - 40px), 400px"
                  alt=""
                />
              </div>
              <div>
                <p className="project-type">視覺設計 · 概念作品</p>
                <h3 id="strata-title" lang="en" translate="no">Strata</h3>
                <p>將波形轉成層疊的玻璃，在厚薄與透光的變化中呈現節奏。</p>
              </div>
            </article>
          </section>
        </div>

        <section className="about frame" id="about" aria-labelledby="about-title">
          <p className="overline" lang="en">About</p>
          <h2 id="about-title">關於 <span lang="en" translate="no">Dynity</span></h2>
          <p>Dynity 是一個數位設計與互動實驗的計畫，探索動態如何連接畫面、內容與操作。</p>
        </section>
      </main>

      <footer className="site-footer frame">
        <span className="wordmark" translate="no">Dynity</span>
        <div className="footer-links">
          <a href="https://github.com/fyi100630/Dynity-Website">GitHub <span aria-hidden="true">↗</span></a>
          <a href="#top">回到頂端 <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
