import { notFound } from "next/navigation";
import { ProjectDetail } from "../../project-detail";
import { projectPath, projects } from "../../projects";
import { pageMetadata, siteUrl } from "../../site-config";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

async function getProject({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata(props: PageProps) {
  const project = await getProject(props);
  const cover = siteUrl ? new URL(project.cover.large.src, siteUrl).href : undefined;
  return pageMetadata(project.name, project.summary, projectPath(project), cover);
}

export default async function WorkDetailPage(props: PageProps) {
  return <ProjectDetail project={await getProject(props)} />;
}
