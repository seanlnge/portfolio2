import { useState } from "react";
import CaseStudyDialog from "./CaseStudyDialog";
import ProjectToolIcons from "./ProjectToolIcons";

type HighlightedProject = {
  name: string;
  description: string;
  link: string;
  image: string;
  code: string;
  tools?: string[];
  privateCode?: boolean;
  tags?: string[];
  caseStudy?: string;
};

type HighlightedProjectsProps = {
  projects: HighlightedProject[];
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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
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
                <h3 className="text-3xl font-semibold text-m-black font-header">
                  {project.name}
                </h3>
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
    </>
  );
};

export default HighlightedProjects;
