import { SiteLink, Arrow } from "./site";

export default function NotFound() {
  return (
    <div className="shell content-page">
      <h1 className="display page-title">找不到這個頁面</h1>
      <p className="body-copy">你可以從首頁繼續探索 Dynity 的作品。</p>
      <SiteLink className="text-link" href="/">回到首頁 <Arrow /></SiteLink>
    </div>
  );
}
