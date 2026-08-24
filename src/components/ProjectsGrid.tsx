import { useMemo, useState } from "react";
import { compareBuiltDesc, type Project } from "../lib/projects";
import CaseStudyDialog from "./CaseStudyDialog";
import ProjectCard from "./ProjectCard";

type ProjectsGridProps = {
  projects: Record<string, Project>;
  highlights?: string[];
};

const tabs = ["All", "Frontend", "Backend", "Infrastructure", "Games", "Products", "Dev Tools"] as const;
type Tab = typeof tabs[number];

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<{
    name: string;
    slug: string;
  } | null>(null);
  const entries = useMemo(
    () =>
      Object.entries(projects)
        .map(([name, project]) => ({ name, ...project }))
        .sort((a, b) => compareBuiltDesc(a.built, b.built)),
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      activeTab === "All"
        ? entries
        : entries.filter((project) => project.tags?.includes(activeTab)),
    [activeTab, entries]
  );

  return (
    <div className="space-y-8">
      <CaseStudyDialog
        projectName={activeCaseStudy?.name ?? null}
        caseStudySlug={activeCaseStudy?.slug ?? null}
        onClose={() => setActiveCaseStudy(null)}
      />
      <div className="flex flex-wrap items-center gap-px border border-white/12">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold font-header transition-colors duration-200 ${
                isActive
                  ? "bg-m-white text-m-black"
                  : "bg-transparent text-slate-300 hover:bg-white/10 hover:text-m-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-slate-300">No projects tagged in this category yet.</p>
      ) : (
        <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              {...project}
              priority={index < 3}
              onOpenCaseStudy={(name, slug) => setActiveCaseStudy({ name, slug })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
