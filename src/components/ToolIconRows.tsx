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

type ToolRow = {
  title: string;
  items: ToolItem[];
};

const toolRows: ToolRow[] = [
  {
    title: "Core Stack",
    items: [
      { id: "typescript", name: "TypeScript", Icon: SiTypescript, colorClass: "text-sky-400" },
      { id: "react", name: "React", Icon: SiReact, colorClass: "text-cyan-300" },
      { id: "next", name: "Next.js", Icon: SiNextdotjs, colorClass: "text-slate-200" },
      { id: "node", name: "Node.js", Icon: SiNodedotjs, colorClass: "text-emerald-300" },
      { id: "trpc", name: "tRPC", Icon: SiTrpc, colorClass: "text-violet-300" },
    ],
  },
  {
    title: "Web Development",
    items: [
      { id: "express", name: "Express.js", Icon: SiExpress, colorClass: "text-amber-300" },
      { id: "auth", name: "Auth.js", Icon: SiAuth0, colorClass: "text-lime-300" },
      { id: "ws", name: "WebSockets", Icon: SiSocketdotio, colorClass: "text-sky-300" },
      { id: "tailwind", name: "Tailwind CSS", Icon: SiTailwindcss, colorClass: "text-cyan-300" },
    ],
  },
  {
    title: "Infrastructure & Data",
    items: [
      { id: "aws", name: "AWS", Icon: FaAws, colorClass: "text-amber-400" },
      { id: "docker", name: "Docker", Icon: SiDocker, colorClass: "text-sky-400" },
      { id: "cicd", name: "CI/CD", Icon: SiGithubactions, colorClass: "text-violet-300" },
      { id: "postgres", name: "PostgreSQL", Icon: SiPostgresql, colorClass: "text-indigo-300" },
      { id: "redis", name: "Redis", Icon: SiRedis, colorClass: "text-rose-300" },
      { id: "mongo", name: "MongoDB", Icon: SiMongodb, colorClass: "text-emerald-300" },
    ],
  },
];

const ToolIconRows = () => {
  return (
    <div className="flex flex-col gap-6 text-sm md:text-base justify-center">
      {toolRows.map((row) => (
        <div key={row.title} className="space-y-3">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-m-white/70">
            {row.title}
          </p>
          <div className="flex items-center -space-x-3 pl-6 md:pl-8 overflow-visible">
            {row.items.map((item) => {
              return (
                <span
                  key={item.id}
                  className={`group relative flex items-center hover:z-20 mr-0`}
                >
                  <span
                    className={`h-13 px-3 rounded-full border border-m-primary-light/30 bg-m-primary-ultradark/70 ring-2 ring-m-primary-black/80 flex items-center justify-center ${item.colorClass}`}
                  >
                    <item.Icon className="h-7 w-7" />
                    <span className={`whitespace-nowrap text-sm font-semibold font-header text-m-white duration-300 transition-all ease-out w-0 opacity-0 ml-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2`}>
                      {item.name}
                    </span>
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolIconRows;
