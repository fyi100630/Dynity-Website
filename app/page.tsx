import { SiteLink, Arrow, JsonLd, Wordmark } from "./site";
import { absoluteUrl, siteDescription } from "./site-config";
import { featuredProject, projects, projectPath } from "./projects";
import { ProjectArtwork, ProjectStatus, ProjectTitle, ResponsiveImage, WorkList, projectTheme } from "./project-ui";
import { StoryMotion } from "./story-motion";

export default function Home() {
  const project = featuredProject;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Dynity", description: siteDescription, url: absoluteUrl("/") }} />
      <div className="story" data-story style={projectTheme(project)}>
        <StoryMotion />
        <section className="brand-hero" aria-labelledby="hero-title" data-story-hero>
          <div className="hero-wash" data-hero-wash aria-hidden="true" />
          <div className="shell brand-shell">
            <div className="brand-lockup">
              <p className="brand-intro" data-hero-copy>獨立軟體開發團隊</p>
              <h1 className="brand-title" id="hero-title"><span data-hero-wordmark><Wordmark /></span></h1>
              <p className="brand-tagline" data-hero-copy lang="en">We build things we wish existed.</p>
            </div>
            <div className="hero-bottom">
              <a className="scroll-link" href="#featured"><span>探索作品</span><span className="scroll-icon"><Arrow direction="down" /></span></a>
            </div>
          </div>
        </section>

        <section className="spotlight" id="featured" aria-labelledby="spotlight-title">
          <div className="shell spotlight-inner">
            <div className="spotlight-copy">
              <div className="spotlight-meta"><span className="section-label">精選作品</span><ProjectStatus project={project} /></div>
              <ProjectTitle project={project} as="h2" id="spotlight-title" className="display spotlight-title" />
              <p className="spotlight-line">{project.tagline ?? project.name}</p>
              <p className="body-copy">{project.summary}</p>
              <div className="actions">
                {project.website && <a className="button" href={project.website}>前往產品網站 <Arrow direction="external" /></a>}
                <SiteLink className="text-link" href={projectPath(project)}>作品介紹 <Arrow /></SiteLink>
              </div>
            </div>
            <div className="artwork-frame spotlight-artwork" data-artwork-origin>
              <ProjectArtwork project={project} travel />
            </div>
          </div>
        </section>

        <section className="home-work" id="work" aria-labelledby="work-title">
          <div className="work-wash" data-work-wash aria-hidden="true" />
          <div className="shell">
            <div className="section-heading home-work-heading">
              <h2 id="work-title" className="display">作品索引</h2>
              <SiteLink className="text-link" href="/work/">查看所有作品 <Arrow /></SiteLink>
            </div>
            <WorkList items={projects} sharedSlug={project.slug} />
            {project.fieldNote && (
              <section className="home-field-note story-split" aria-labelledby="home-field-note-title">
                <div>
                  <h3 id="home-field-note-title" className="display sub-title">{project.fieldNote.title}</h3>
                  <p className="body-copy">{project.fieldNote.summary}</p>
                  <SiteLink href={`${projectPath(project)}#island-life`} className="text-link">看看島上還能做什麼</SiteLink>
                </div>
                <ResponsiveImage className="field-note-image" image={project.fieldNote.image} sizes="(max-width: 760px) 90vw, 54vw" />
              </section>
            )}
          </div>
        </section>
        <section className="home-about ink-section" id="studio" aria-labelledby="studio-title">
          <div className="about-wash" data-about-wash aria-hidden="true" />
          <div className="shell about-grid">
            <h2 id="studio-title" className="display about-display" lang="en">Small ideas.<br />Real things.</h2>
            <div>
              <p className="section-label">關於 Dynity</p>
              <p className="about-copy">我們是 CC 和 Eric，兩個一起做 App、遊戲和工具的高中生。Dynity 從我們平常想用、卻還找不到的東西開始。</p>
              <SiteLink className="text-link" href="/about/">認識團隊 <Arrow /></SiteLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
