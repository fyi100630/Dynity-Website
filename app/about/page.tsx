import type { Metadata } from "next";
import Link from "next/link";
import { islandUrl } from "../site";

export const metadata: Metadata = {
  title: "關於 Dynity",
  description: "認識 Dynity 軟體開發團隊，以及我們如何把一個專注計時的想法做成 Android 產品《孤島求生》。",
};

export default function About() {
  return (
    <>
      <section className="subpage-intro dark-section" aria-labelledby="about-title">
        <div className="frame article-frame">
          <p className="eyebrow">關於 Dynity</p>
          <h1 id="about-title">從生活裡的問題<br />開始開發軟體。</h1>
          <p className="lead">Dynity 是一個軟體開發團隊。《孤島求生》是我們的第一個產品，讓使用者從一段簡單的專注計時開始，逐步建起自己的島。</p>
        </div>
      </section>

      <section className="frame detail-section" aria-labelledby="development-title">
        <div className="brand-grid">
          <h2 id="development-title">產品是怎麼做出來的</h2>
          <div>
            <p className="statement">把專注成果做成看得見的進度。</p>
            <p className="lead">每完成一段專注，就能領取經驗值與金幣。把獎勵花在房屋和島嶼上，讓零散的專注時段累積成一座會成長的島。</p>
          </div>
        </div>
        <dl className="principles">
          <div>
            <dt>Android 原生開發</dt>
            <dd>使用 Kotlin 和 Jetpack Compose，支援手機與平板版面，以及繁體中文、英文介面。</dd>
          </div>
          <div>
            <dt>照顧不同使用方式</dt>
            <dd>使用者可以用訪客模式開始。需要跨裝置保存進度時，可使用 Google 帳號登入並備份。</dd>
          </div>
          <div>
            <dt>先讓測試者實際使用</dt>
            <dd>目前透過 Google Play 封閉測試收集使用體驗。測試者可在 App 內回報問題或提供建議。</dd>
          </div>
        </dl>
        <Link className="button" href={islandUrl}>查看第一個產品 <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
