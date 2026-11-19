import { islandProject } from "../projects";
import { Arrow } from "../site";
import { githubUrl, pageMetadata } from "../site-config";

export const metadata = pageMetadata("聯絡", "聯絡《孤島求生》產品支援，或在 GitHub 查看 Dynity 官網原始碼。", "/contact/");

export default function ContactPage() {
  return (
    <div className="shell content-page">
      <header className="page-heading">
        <h1 className="display page-title">聯絡</h1>
        <p className="body-copy">回報《孤島求生》的問題、分享建議，或看看這個網站是怎麼做的。</p>
      </header>
      <div className="contact-links">
        <section>
          <h2>孤島求生產品支援</h2>
          <p className="body-copy">你也可以從 App 內的「我的 → 設定 → 關於」回報問題。</p>
          <a className="text-link" href={`mailto:${islandProject.support.email}`}>寄信給產品支援 <Arrow direction="external" /></a>
        </section>
        <section>
          <h2>Dynity 官網原始碼</h2>
          <p className="body-copy">在 GitHub 查看網站原始碼與更新紀錄。</p>
          <a className="text-link" href={githubUrl}>前往 GitHub <Arrow direction="external" /></a>
        </section>
      </div>
    </div>
  );
}
