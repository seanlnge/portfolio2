import { formatBuiltMonthYear } from "../lib/projects";
import ProjectMetaBadges from "./ProjectMetaBadges";
import ProjectToolIcons from "./ProjectToolIcons";

type ProjectCardProps = {
  name: string;
  description: string;
  link?: string;
  image: string;
  imageSrcSet?: string;
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  code: string;
  tools?: string[];
  privateCode?: boolean;
  caseStudy?: string;
  built: string;
  hackathonWin?: boolean;
  onOpenCaseStudy?: (projectName: string, caseStudySlug: string) => void;
};

const actionClassName =
  "inline-flex items-center justify-center px-3 py-3 sm:px-5 font-header text-xs sm:text-sm font-semibold text-m-accent-light underline decoration-m-accent-light underline-offset-4 transition-colors duration-150 hover:bg-m-accent-light hover:text-m-black hover:decoration-m-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-m-accent-light [&:not(:last-child)]:border-r [&:not(:last-child)]:border-white/12";

const ProjectCard = ({
  name,
  description,
  link,
  image,
  imageSrcSet,
  imageWidth,
  imageHeight,
  priority = false,
  code,
  tools,
  privateCode,
  caseStudy,
  built,
  hackathonWin,
  onOpenCaseStudy,
}: ProjectCardProps) => {
  const imageSrc = image.startsWith("/") || image.startsWith("http") || image.startsWith("data:") ? image : `/images/${image}`;
  const actionCount = (caseStudy ? 1 : 0) + (link ? 1 : 0) + 1;
  const gridCols = actionCount === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <article className="flex h-full flex-col overflow-hidden bg-m-primary-black">
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={imageSrc}
          srcSet={imageSrcSet}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          width={imageWidth}
          height={imageHeight}
          alt={`${name} preview`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-header text-xl font-semibold text-m-white">{name}</h3>
            <time
              dateTime={built}
              className="shrink-0 font-header text-xs font-semibold uppercase tracking-wide text-slate-400"
            >
              {formatBuiltMonthYear(built)}
            </time>
          </div>
          <p className="text-sm leading-6 text-slate-200">{description}</p>
        </div>
        <div className="mt-auto flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <ProjectToolIcons tools={tools} />
          </div>
          <ProjectMetaBadges name={name} built={built} hackathonWin={hackathonWin} />
        </div>
      </div>
      <div className={`grid ${gridCols} border-t border-white/12`}>
        {caseStudy && (
          <a
            href={`/markdown/${caseStudy}`}
            onClick={(event) => {
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.altKey ||
                event.ctrlKey ||
                event.shiftKey
              ) {
                return;
              }

              event.preventDefault();
              onOpenCaseStudy?.(name, caseStudy);
            }}
            className={actionClassName}
          >
            Case Study
          </a>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={actionClassName}
          >
            Preview
          </a>
        )}
        {privateCode ? (
          <span className="inline-flex items-center justify-center px-3 py-3 sm:px-5 font-header text-xs sm:text-sm font-semibold text-m-white">
            Private
          </span>
        ) : (
          <a href={code} target="_blank" rel="noreferrer" className={actionClassName}>
            View Code
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
