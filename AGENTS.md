# Dynity Website

四個 Skills 隨 Git 儲存在 `.agents/skills/`。每次開始相關工作時先讀取下列本地
`SKILL.md` 與它所引用的規則。新 Codex Cloud 工作副本可直接使用這些檔案。
`skills-lock.json` 記錄官方 Skills CLI 1.9.0 安裝時所用的上游提交及內容雜湊。
更新前先審查上游說明、腳本和授權。授權見各 Skill 附帶的檔案及
`.agents/licenses/`。

| Skill | 使用時機 |
| --- | --- |
| [frontend-design](.agents/skills/frontend-design/SKILL.md) | 設計首頁、產品展示或品牌視覺前，先建立構圖、字體、色彩與素材方向。 |
| [ui-ux-pro-max](.agents/skills/ui-ux-pro-max/SKILL.md) | 規劃設計系統、排版、互動及響應式體驗時，搜尋本地資料並依 Dynity 的需求採用規則。 |
| [web-design-guidelines](.agents/skills/web-design-guidelines/SKILL.md) | UI 實作完成後，從 Skill 指定的上游網址讀取最新規則，審查操作、排版、無障礙與動態效果。 |
| [react-best-practices](.agents/skills/react-best-practices/SKILL.md) | 開發、審查或最佳化 React 與 Next.js 元件前，讀取適用的 bundle、渲染及效能規則。此安裝名稱沿用專案要求，上游名稱為 `vercel-react-best-practices`。 |

UI/UX Pro Max 的上游說明使用 Claude 路徑，在本倉庫從根目錄執行
`python3 .agents/skills/ui-ux-pro-max/scripts/search.py` 並加上查詢參數。

首頁 Hero 與 Projects 的共用主視覺以 GSAP ScrollTrigger 隨原生捲動移動。
調整動畫時，保留靜態閱讀順序、窄螢幕排版、反向捲動及
`prefers-reduced-motion` 和無 JavaScript 的替代畫面。

使用 `npm ci` 安裝網站依賴。修改後執行 `npm run lint`、
`npm run typecheck`、`npm run build` 和 `npm test`。瀏覽器測試使用已建置網站，
第一次可用 `npx playwright install chromium` 準備瀏覽器，或以
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 指定既有 Chromium。

GitHub Pages 從 `main` 的根目錄發布。執行 `npm run build:pages` 會以
`/Dynity-Website` 為網址前綴，更新根目錄的靜態匯出檔案。更新網站時，
將原始碼、根目錄的匯出檔案與 `.nojekyll` 一起提交到 `main`。
本機開發用 `npm run dev`。執行一般的 `npm run build` 後，可以用
`npm start` 預覽 `out/`，也可執行 `npm test`。
