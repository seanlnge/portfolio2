import { useMemo, useState } from "react";
import CaseStudyDialog from "./CaseStudyDialog";
import ProjectToolIcons from "./ProjectToolIcons";

type Project = {
  description: string;
  link: string;
  image: string;
  code: string;
  caseStudy?: string;
  tools?: string[];
  privateCode?: boolean;
  tags?: string[];
};

type ProjectsGridProps = {
  projects: Record<string, Project>;
  highlights: string[];
};

const tabs = ["All", "Frontend", "Backend", "Infrastructure", "Games", "Products", "Dev Tools"] as const;
type Tab = typeof tabs[number];

const ProjectsGrid = ({ projects, highlights }: ProjectsGridProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<{
    name: string;
    slug: string;
  } | null>(null);
  const highlightedSet = useMemo(() => new Set(highlights), [highlights]);
  const entries = useMemo(
    () => Object.entries(projects).map(([name, project]) => ({ name, ...project })),
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
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold font-header transition duration-300 ${
                isActive
                  ? "border-m-primary-light bg-m-primary-light/30 text-m-white"
                  : "border-m-primary-light/30 text-slate-200 hover:border-m-primary-light hover:text-m-white"
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-slate-200 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-black/40"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={`/images/${project.image}`}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 h-full">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-m-black font-header">
                      {project.name}
                    </h2>
                    {highlightedSet.has(project.name) ? (
                      <span className="rounded-full border border-black/20 bg-m-primary-light/30 px-3 py-1 text-xs font-semibold text-m-black">
                        Highlighted
                      </span>
                    ) : null}
                  </div>
                  <p className="my-3 text-sm leading-relaxed text-slate-700">
                    {project.description}
                  </p>
                  <div className="mt-auto w-full">
                    <ProjectToolIcons tools={project.tools} />
                  </div>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-sm font-semibold text-m-black">
                  {project.caseStudy ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCaseStudy({
                          name: project.name,
                          slug: project.caseStudy ?? "",
                        })
                      }
                      className="rounded-full border border-black/20 bg-m-primary-light/30 font-header px-4 py-2 text-m-black transition duration-300 hover:border-m-black hover:bg-m-primary-light hover:text-m-white"
                    >
                      Case Study
                    </button>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-black/20 bg-m-primary-light/30 font-header px-4 py-2 text-m-black transition duration-300 hover:border-m-black hover:bg-m-primary-light hover:text-m-white"
                    >
                      View Project
                    </a>
                  )}
                  {project.privateCode ? (
                    <span className="rounded-full border border-black/20 bg-m-primary-light/30 font-header px-4 py-2 text-m-black opacity-50 cursor-not-allowed">
                      Private Repo
                    </span>
                  ) : (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-black/20 bg-m-primary-light/30 font-header px-4 py-2 text-m-black transition duration-300 hover:border-m-black hover:bg-m-primary-light hover:text-m-white"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
