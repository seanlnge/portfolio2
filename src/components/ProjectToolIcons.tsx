import type { IconType } from "react-icons";
import {
  SiAuth0,
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTrpc,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

type ToolItem = {
  id: string;
  name: string;
  Icon: IconType;
  colorClass: string;
};

const toolMap: Record<string, ToolItem> = {
  typescript: { id: "typescript", name: "TypeScript", Icon: SiTypescript, colorClass: "text-sky-400" },
  react: { id: "react", name: "React", Icon: SiReact, colorClass: "text-cyan-300" },
  next: { id: "next", name: "Next.js", Icon: SiNextdotjs, colorClass: "text-slate-200" },
  node: { id: "node", name: "Node.js", Icon: SiNodedotjs, colorClass: "text-emerald-300" },
  trpc: { id: "trpc", name: "tRPC", Icon: SiTrpc, colorClass: "text-violet-300" },
  express: { id: "express", name: "Express.js", Icon: SiExpress, colorClass: "text-amber-300" },
  auth: { id: "auth", name: "Auth.js", Icon: SiAuth0, colorClass: "text-lime-300" },
  ws: { id: "ws", name: "WebSockets", Icon: SiSocketdotio, colorClass: "text-sky-300" },
  tailwind: { id: "tailwind", name: "Tailwind CSS", Icon: SiTailwindcss, colorClass: "text-cyan-300" },
  aws: { id: "aws", name: "AWS", Icon: FaAws, colorClass: "text-amber-400" },
  docker: { id: "docker", name: "Docker", Icon: SiDocker, colorClass: "text-sky-400" },
  cicd: { id: "cicd", name: "CI/CD", Icon: SiGithubactions, colorClass: "text-violet-300" },
  postgres: { id: "postgres", name: "PostgreSQL", Icon: SiPostgresql, colorClass: "text-indigo-300" },
  redis: { id: "redis", name: "Redis", Icon: SiRedis, colorClass: "text-rose-300" },
  mongo: { id: "mongo", name: "MongoDB", Icon: SiMongodb, colorClass: "text-emerald-300" },
  git: { id: "git", name: "Git", Icon: SiGit, colorClass: "text-orange-300" },
};

type ProjectToolIconsProps = {
  tools?: string[];
};

const ProjectToolIcons = ({ tools = [] }: ProjectToolIconsProps) => {
  const toolItems = tools.map((tool) => toolMap[tool]).filter(Boolean);

  if (toolItems.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center -space-x-3 overflow-visible pb-2">
      {toolItems.map((item) => (
        <span key={item.id} className="group/spec relative flex items-center hover:z-20 mr-0">
          <span
            className={`h-10 px-2.5 rounded-full border border-m-primary-light bg-m-primary-ultradark ring-2 ring-m-primary-black/80 flex items-center justify-center ${item.colorClass}`}
          >
            <item.Icon className="h-5 w-5" />
            <span className="whitespace-nowrap text-sm font-semibold font-header text-m-white duration-300 transition-all ease-out w-0 opacity-0 ml-0 group-hover/spec:w-auto group-hover/spec:opacity-100 group-hover/spec:ml-2">
              {item.name}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
};

export default ProjectToolIcons;
