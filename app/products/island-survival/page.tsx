import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import islandFocus from "../../assets/island-focus.webp";
import islandResult from "../../assets/island-result.webp";
import islandTown from "../../assets/island-town.webp";
import { islandPrivacyUrl } from "../../site";

export const metadata: Metadata = {
  title: "孤島求生",
  description: "《孤島求生》是 Dynity 開發的 Android 專注與島嶼經營 App，目前在 Google Play 封閉測試。",
};

const steps = [
  {
    title: "開始一段專注",
    description: "設定計時長度與容易分心的 App。需要時可開啟封鎖模式，在專注時顯示封印畫面。",
    image: islandFocus,
    alt: "專注計時畫面有倒數進度圈及暫停按鈕",
  },
  {
    title: "回島領取獎勵",
    description: "專注完成後回到島上領取經驗值與金幣。每日目標和任務提供額外的獎勵。",
    image: islandResult,
    alt: "專注結算畫面列出獲得的獎勵和今日進度",
  },
  {
    title: "從小島蓋到城鎮",
    description: "用金幣購買建築，把它們擺到地圖格子上，再用開拓旗向外擴張島嶼。",
    image: islandTown,
    alt: "發展後的等角島嶼上有道路、住宅和成片的建築",
  },
];

export default function IslandSurvival() {
  return (
    <>
      <section className="product-intro dark-section" aria-labelledby="island-title">
        <div className="frame split">
          <div>
            <p className="eyebrow">Dynity 的第一個產品</p>
            <h1 id="island-title">孤島求生</h1>
            <p className="english-name" lang="en" translate="no">Island Survival</p>
            <p className="lead">把專注變成建造一座島的時間。從一次計時開始，慢慢解鎖建築、擴張土地，蓋出自己的城鎮。</p>
            <p className="status"><span aria-hidden="true" />Android · Google Play 封閉測試</p>
            <div className="actions">
              <a className="button" href="#how-it-works">看遊玩流程 <span aria-hidden="true">↓</span></a>
              <a className="text-link" href="#testing">了解封測</a>
            </div>
          </div>
          <div className="product-hero-image">
            <Image src={islandTown} alt="孤島求生的城鎮畫面" preload />
          </div>
        </div>
      </section>

      <section className="frame detail-section" id="how-it-works" aria-labelledby="how-title">
        <div className="section-heading">
          <h2 id="how-title">專注、結算、建造</h2>
          <p className="lead">從離開螢幕到回到島上，一輪專注的流程。</p>
        </div>
        <ol className="feature-grid" role="list">
          {steps.map((step) => (
            <li className="feature" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <Image className="screenshot" src={step.image} alt={step.alt} />
            </li>
          ))}
        </ol>
      </section>

      <section className="brand-section" id="testing" aria-labelledby="testing-title">
        <div className="frame brand-grid">
          <div>
            <h2 id="testing-title">封閉測試與常見問題</h2>
            <p className="lead">目前透過 Google Play 封閉測試提供給受邀測試者。</p>
          </div>
          <div className="faq">
            <details>
              <summary>哪些裝置可以使用？</summary>
              <p>目前提供 Android 版，可在手機與平板上使用。介面支援繁體中文及英文。</p>
            </details>
            <details>
              <summary>一定要登入才能玩嗎？</summary>
              <p>可以用訪客模式遊玩，島嶼會保存在目前的裝置上。使用 Google 帳號登入後，可將進度備份到雲端。</p>
            </details>
            <details>
              <summary>封鎖模式一定要開啟嗎？</summary>
              <p>可以只使用專注計時。若要在專注時顯示封印畫面，可在 App 裡啟用封鎖模式並授予所需的 Android 權限。</p>
            </details>
          </div>
        </div>
      </section>

      <section className="frame detail-section brand-grid" id="support" aria-labelledby="support-title">
        <h2 id="support-title">產品支援</h2>
        <div>
          <p className="lead">測試者可以在 App 內回報問題或提供建議，也可透過商店所列的支援信箱聯絡。</p>
          <div className="actions">
            <a className="button" href="mailto:cc20110630@gmail.com">寄信給產品支援</a>
            <a className="text-link" href={islandPrivacyUrl}>隱私權政策與帳號刪除 <span aria-hidden="true">↗</span></a>
          </div>
          <Link className="text-link" href="/about/">認識開發團隊 <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
