import { useState } from "react";
import type { Project } from "../lib/projects";
import CaseStudyDialog from "./CaseStudyDialog";
import ProjectCard from "./ProjectCard";

type HighlightedProjectsProps = {
  projects: Array<Project & { name: string }>;
};

const HighlightedProjects = ({ projects }: HighlightedProjectsProps) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState<{
    name: string;
    slug: string;
  } | null>(null);

  return (
    <>
      <CaseStudyDialog
        projectName={activeCaseStudy?.name ?? null}
        caseStudySlug={activeCaseStudy?.slug ?? null}
        onClose={() => setActiveCaseStudy(null)}
      />
      <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            {...project}
            priority
            onOpenCaseStudy={(name, slug) => setActiveCaseStudy({ name, slug })}
          />
        ))}
      </div>
    </>
  );
};

export default HighlightedProjects;
