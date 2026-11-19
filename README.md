# Dynity 官方網站

Dynity 的品牌網站。首頁從字標進入《孤島求生》的實機展示，再接到作品索引和團隊介紹。所有頁面都由 Next.js App Router 靜態輸出。

## 在本機執行

建議使用 Node.js 22。

```sh
npm ci
npm run dev
```

要預覽正式建置，執行 `npm run build`，接著執行 `npm start`。

## 網站架構

| 路徑 | 內容 |
| --- | --- |
| `/` | 品牌、精選作品、作品索引與團隊介紹 |
| `/work/` | 所有已確認的作品 |
| `/work/[slug]/` | 作品介紹、實機截圖、上架資訊與產品支援 |
| `/about/` | Dynity 的團隊與開發理念 |
| `/contact/` | 已公開的產品支援信箱與網站 GitHub |
| `/products/island-survival/` | 舊網址，支援既有的 `#support`、`#testing` 和 `#how-it-works` 連結 |

作品資料放在 [app/projects.ts](app/projects.ts)。新增作品時，加入一筆資料並提供兩種尺寸的 WebP。作品索引、作品路由、sitemap 和首頁精選展示由同一份資料產生。資料支援已發布、開發中與實驗專案，以及選填的官網、平台、GitHub、支援資訊和主題色。需要更換首頁作品時，將 `featured` 設在要展示的作品上。

## 參考研究

- Flyme AIOS 的首頁將中央圖形逐步放大到滿版，文字和影片接在同一段捲動進度上。後續展示會改變手機畫面的尺寸和文字位置，維持視覺重心。以 Chromium 查看開場及前幾段畫面，並查看公開前端的 ScrollTrigger 設定。直接載入遇到上游連線中斷，使用另行取得的原始 HTML、CSS 與 JavaScript 在瀏覽器重放。觀察範圍包含開場轉場與部分產品展示。[Flyme AIOS](https://www.flyme.com/aios/)
- 《孤島求生》官網從分心的情境開始，接著介紹專注、領取獎勵、擴張小島的玩法，以及隱私與支援資訊。公開頁面目前標示 Google Play 即將上架。Dynity 主站選用現有 repo 的小島素材，並使用官網公開的實機截圖，保留產品網站作為詳細介紹的入口。[孤島求生官網](https://islandsurvival-intro.pages.dev/)

## 設計與動態

設計 token 和響應式樣式集中在 [app/globals.css](app/globals.css)。

| 要素 | 設計 |
| --- | --- |
| 色彩 | 暖紙白 `#f7f6f2`、墨黑 `#20211f`、品牌藍 `#2258bd`、島嶼霧藍 `#dce9ee`、工作室深灰 `#222c2e` |
| 字體 | Bricolage Grotesque 用於字標與英文展示標題，Geist 用於英文內文，Noto Sans TC 用於繁體中文 |
| 版面 | 流動字級、共用內容寬度及留白。手機使用直向作品構圖和 44px 觸控區域 |
| 元件 | 共用導覽、按鈕、頁尾、作品列與具尺寸描述的響應式圖片 |

[app/story-motion.tsx](app/story-motion.tsx) 集中管理 ScrollTrigger。桌面導覽字標從首頁標題的位置開始，隨捲動移到導覽列。產品文字短暫固定，同一個實機展示沿著兩個版位的位置和尺寸縮進作品列。背景過渡由各場景共用色控制。ScrollTrigger 重新計算時讀取固定版位，捲動時更新 transform。媒體條件變化後會還原動畫。跨頁連結交由瀏覽器導覽，返回首頁時會回復原先的捲動位置。

桌面敘事適用於寬度至少 901px、高度至少 680px 且有精細指標的視窗。手機使用原生捲動，支援 CSS 捲動時間軸的瀏覽器會顯示背景過渡。減少動態效果或 JavaScript 無法使用時，各段內容、圖片與連結仍能閱讀和操作。

繁中 WebFont 只包含目前的網站文案。新增文案時，未涵蓋的字會使用裝置字型。需要更新 WebFont 時，下載來源 TTF，安裝 `fonttools[woff]`，再執行 `python3 scripts/subset-chinese-font.py /path/to/NotoSansTC.ttf`。授權隨字型附在 `app/assets/fonts/`。[Noto Sans TC 來源](https://github.com/google/fonts/tree/main/ofl/notosanstc)

## 部署

### Cloudflare Pages

| 設定 | 值 |
| --- | --- |
| 建置指令 | `npm run build` |
| 輸出資料夾 | `out` |
| 環境變數 | `SITE_URL` 設為公開網站完整 URL |
| Node.js | 22，見 `.node-version` |

網站的內容與導覽可由靜態檔案提供，因此 Cloudflare Pages 可直接部署。若未來需要伺服器端表單處理、登入或動態資料，再評估 Workers 與 OpenNext。設定 `SITE_URL` 後會產生正式 canonical、Open Graph 網址及 sitemap。[Cloudflare Pages 的 Next.js 靜態部署說明](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

### 現有 GitHub Pages

`npm run build:pages` 會使用已確認的 GitHub Pages 網址及 `/Dynity-Website` 前綴，更新 repository 根目錄的靜態檔案。網站由 `main` 根目錄發布，來源檔與靜態輸出可一起提交。若更換發布網址，使用 `SITE_URL` 和 `PAGES_BASE_PATH` 覆寫。

## 驗證

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

也可以透過 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 指定本機 Chromium。瀏覽器測試涵蓋字標與實機畫面銜接、正反向捲動、手機尺寸、視窗調整、減少動態效果、停用 JavaScript、鍵盤導覽、舊網址，以及首頁與內頁的 axe 檢查。

## 待補資料

- Dynity 正式網域與 Cloudflare Pages 專案。
- Coin Café 的正式名稱、作品狀態、介紹與可公開素材。
- 《孤島求生》的正式 Google Play 上架連結。
- 若團隊有品牌聯絡信箱，可補在聯絡頁。目前使用《孤島求生》公開的產品支援方式。
