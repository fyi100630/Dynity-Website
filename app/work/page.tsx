import { WorkList } from "../project-ui";
import { projects } from "../projects";
import { pageMetadata } from "../site-config";

export const metadata = pageMetadata("作品", "探索 Dynity 開發的軟體與遊戲，從專注計時與島嶼經營 App《孤島求生》開始。", "/work/");

export default function WorkPage() {
  return (
    <div className="shell content-page">
      <section className="page-heading" aria-labelledby="work-page-title">
        <h1 className="display page-title" id="work-page-title">作品</h1>
        <p className="body-copy">Dynity 正在做的軟體、遊戲和工具。</p>
      </section>
      <section aria-labelledby="project-list-title">
        <h2 className="sr-only" id="project-list-title">所有作品</h2>
        <WorkList items={projects} showSummaries />
      </section>
    </div>
  );
}
