import { projectTheme, ProjectArtwork, ProjectStatus, ResponsiveImage } from "./project-ui";
import { type Project, projectPath } from "./projects";
import { SiteLink, Arrow, JsonLd } from "./site";
import { absoluteUrl } from "./site-config";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article style={projectTheme(project)}>
      {project.platform && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.englishName,
          alternateName: project.name,
          description: project.description,
          operatingSystem: project.platform,
          url: absoluteUrl(projectPath(project)) ?? project.website,
          publisher: { "@type": "Organization", name: "Dynity", url: absoluteUrl("/") },
        }} />
      )}
      <header className="detail-intro">
        <div className="shell">
          <SiteLink href="/work/" className="text-link back-link"><Arrow /> 所有作品</SiteLink>
          <div className="detail-grid">
            <div>
              <div className="spotlight-meta"><span className="section-label">{project.category}</span><ProjectStatus project={project} /></div>
              <h1 className="display spotlight-title" lang="en" translate="no">{project.englishName}</h1>
              <p className="spotlight-line">{project.name}</p>
              <p className="body-copy">{project.description}</p>
              <div className="actions">
                {project.website && <a className="button" href={project.website}>前往產品網站 <Arrow direction="external" /></a>}
                {project.repository && <a className="text-link" href={project.repository}>GitHub <Arrow direction="external" /></a>}
              </div>
            </div>
            <div className="artwork-frame"><ProjectArtwork project={project} priority /></div>
          </div>
        </div>
      </header>
      {project.screenshots.length > 0 && (
        <section className="shell detail-section" id="how-it-works" aria-labelledby="how-title">
          <h2 id="how-title" className="display sub-title">實機畫面</h2>
          <ol className="screenshot-list" role="list">
            {project.screenshots.map((item) => (
              <li key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p className="body-copy">{item.description}</p>
                </div>
                <ResponsiveImage image={item.image} sizes="(max-width: 760px) 68vw, 264px" />
              </li>
            ))}
          </ol>
        </section>
      )}
      {(project.releaseNote || project.support) && (
        <section className="detail-info">
          <div className="shell detail-info-grid">
            {project.releaseNote && (
              <div id="testing">
                <h2 className="display sub-title">上架資訊</h2>
                <p className="body-copy">{project.releaseNote}{project.platform ? `，適用於 ${project.platform}。` : "。"}</p>
              </div>
            )}
            {project.support && (
              <div id="support">
                <h2 className="display sub-title">產品支援</h2>
                {project.support.instructions && <p className="body-copy">{project.support.instructions}</p>}
                <div className="actions">
                  <a className="text-link" href={`mailto:${project.support.email}`}>寄信給產品支援 <Arrow direction="external" /></a>
                  <a className="text-link" href={project.support.privacy}>隱私權政策 <Arrow direction="external" /></a>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
