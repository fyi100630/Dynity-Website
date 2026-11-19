import { ProjectDetail } from "../../project-detail";
import { islandProject, projectPath } from "../../projects";
import { pageMetadata } from "../../site-config";

export const metadata = {
  ...pageMetadata(islandProject.name, islandProject.summary, projectPath(islandProject)),
  robots: { index: false, follow: true },
};

export default function LegacyIslandSurvival() {
  return <ProjectDetail project={islandProject} />;
}
