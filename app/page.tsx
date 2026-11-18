import Image from "next/image";
import Link from "next/link";
import islandScene from "./assets/island-scene.webp";
import islandPreview from "./assets/island-preview.webp";
import { islandUrl } from "./site";
import { StoryMotion } from "./story-motion";

function IslandVisual({ hero = false }: { hero?: boolean }) {
  return (
    <div
      className={hero ? "artwork hero-artwork" : "artwork"}
      data-story-artwork={hero || undefined}
      data-story-fallback={!hero || undefined}
    >
      <Image className="scene" src={islandScene} alt="" preload={hero} />
      <Image className="scene-device" src={islandPreview} alt="" loading={hero ? "eager" : "lazy"} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="story" data-story>
        <StoryMotion />
        <section className="hero" aria-labelledby="hero-title">
          <div className="frame split">
            <div className="hero-copy">
              <p className="eyebrow">Dynity 軟體開發團隊</p>
              <h1 id="hero-title">把想法，<br />做成軟體。</h1>
              <p className="lead">我們從日常的問題出發，做成可以親手使用的產品。第一個專案《孤島求生》，把一段段專注時間變成你能親手經營的小島。</p>
              <div className="actions">
                <a className="button" href="#projects">探索作品 <span aria-hidden="true">↓</span></a>
                <Link className="text-link" href="/about/">認識 Dynity <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
            <div className="hero-visual" data-story-origin aria-hidden="true">
              <IslandVisual hero />
            </div>
          </div>
        </section>

        <section className="projects frame" id="projects" aria-labelledby="projects-title">
          <div className="split project-feature">
            <div className="project-copy">
              <p className="eyebrow">我們的第一個產品</p>
              <h2 id="projects-title">孤島求生</h2>
              <p className="english-name" lang="en" translate="no">Island Survival</p>
              <p className="lead">放下手機，專注一段時間。完成後回到島上領取獎勵，蓋下第一棟房子，再一步步把小島擴成自己的城鎮。</p>
              <p className="status"><span aria-hidden="true" />Android · Google Play 封閉測試</p>
              <Link className="button" href={islandUrl}>了解《孤島求生》 <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="project-visual" data-story-destination aria-hidden="true">
              <IslandVisual />
            </div>
          </div>
        </section>
      </div>

      <section className="brand-section" id="about" aria-labelledby="about-title">
        <div className="frame brand-grid">
          <h2 id="about-title">關於 <span translate="no">Dynity</span></h2>
          <div>
            <p className="statement">軟體可以改變一個日常習慣。</p>
            <p className="lead">《孤島求生》從一個具體問題開始：怎麼讓人願意放下手機，並期待下一次專注？我們把計時、回饋和島嶼經營接成同一個使用流程。</p>
            <Link className="text-link" href="/about/">了解我們與產品開發 <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
