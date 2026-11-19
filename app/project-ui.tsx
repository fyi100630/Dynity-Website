import type { CSSProperties } from "react";
import { type Project, type ProjectImage, projectPath, statusLabels } from "./projects";
import { SiteLink, Arrow } from "./site";

export function projectTheme(project: Project) {
  return { "--project-wash": project.theme.wash, "--project-frame": project.theme.frame } as CSSProperties;
}

export function ResponsiveImage({ image, sizes, className, decorative, priority }: {
  image: ProjectImage;
  sizes: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    // Static hosting serves the two pre-encoded sizes without an image optimization server.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={image.large.src}
      srcSet={`${image.small.src} ${image.small.width}w, ${image.large.src} ${image.large.width}w`}
      sizes={sizes}
      width={image.large.width}
      height={image.large.height}
      alt={decorative ? "" : image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

export function ProjectArtwork({ project, travel, compact, priority }: {
  project: Project;
  travel?: boolean;
  compact?: boolean;
  priority?: boolean;
}) {
  const frameSizes = compact ? "(max-width: 760px) 90vw, 450px" : "(max-width: 760px) 90vw, 720px";

  return (
    <div className="artwork" data-artwork-traveler={travel || undefined}>
      {project.artwork ? (
        <>
          <ResponsiveImage image={project.artwork} sizes={frameSizes} className="artwork-scene" decorative priority={priority} />
          <div className="artwork-phone">
            <ResponsiveImage image={project.cover} sizes={compact ? "170px" : "(max-width: 760px) 26vw, 210px"} decorative={compact} priority={priority} />
          </div>
        </>
      ) : (
        <ResponsiveImage image={project.cover} sizes={frameSizes} className="artwork-scene" decorative={compact} priority={priority} />
      )}
    </div>
  );
}

export function ProjectStatus({ project }: { project: Project }) {
  return <span className="project-status">{statusLabels[project.status]}</span>;
}

export function WorkList({ items, sharedSlug }: { items: readonly Project[]; sharedSlug?: string }) {
  return (
    <ul className="work-list" role="list">
      {items.map((project) => (
        <li key={project.slug}>
          <SiteLink className="work-row" href={projectPath(project)} style={projectTheme(project)}>
            <div className="work-row-copy">
              <h3 lang="en" translate="no">{project.englishName}</h3>
              <p><span>{project.name}</span><span>{project.category}</span><ProjectStatus project={project} /></p>
            </div>
            <div className="artwork-frame work-row-artwork" data-artwork-destination={project.slug === sharedSlug || undefined}>
              <ProjectArtwork project={project} compact />
            </div>
            <span className="work-row-arrow"><Arrow /></span>
          </SiteLink>
        </li>
      ))}
    </ul>
  );
}
