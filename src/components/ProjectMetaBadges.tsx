import { Trophy } from "lucide-react";
import { builtYear, isAiProject } from "../lib/projects";

type ProjectMetaBadgesProps = {
  name: string;
  built: string;
  hackathonWin?: boolean;
};

const badgeClassName =
  "flex h-8 items-center justify-center border border-black/20 px-2 font-header text-[11px] font-bold tracking-wide text-m-black";

const ProjectMetaBadges = ({ name, built, hackathonWin }: ProjectMetaBadgesProps) => {
  const year = builtYear(built);
  const ai = isAiProject(name, built);

  return (
    <ul className="flex shrink-0 flex-wrap justify-end gap-1">
      {hackathonWin && (
        <li title="Hackathon win">
          <span className={`${badgeClassName} w-8 bg-gold px-0`}>
            <Trophy className="h-4 w-4" aria-hidden />
            <span className="sr-only">Hackathon win</span>
          </span>
        </li>
      )}
      {ai ? (
        <li title="AI">
          <span className={`${badgeClassName} bg-blue-400`}>AI</span>
        </li>
      ) : (
        <li title="Pre-AI">
          <span className={`${badgeClassName} bg-m-accent-light`}>Pre-AI</span>
        </li>
      )}
      <li title={year}>
        <span className={`${badgeClassName} bg-m-white`}>{year}</span>
      </li>
    </ul>
  );
};

export default ProjectMetaBadges;
