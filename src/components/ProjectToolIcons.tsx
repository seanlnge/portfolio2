import type { IconType } from "react-icons";
import {
  SiAuth0,
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiGit,
  SiGooglecloud,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiHeroku,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTrpc,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { FaAws, FaRobot, FaPaintBrush, FaSuperscript } from "react-icons/fa";

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
  "google-cloud": {
    id: "google-cloud",
    name: "Google Cloud",
    Icon: SiGooglecloud,
    colorClass: "text-blue-300",
  },
  docker: { id: "docker", name: "Docker", Icon: SiDocker, colorClass: "text-sky-400" },
  cicd: { id: "cicd", name: "CI/CD", Icon: SiGithubactions, colorClass: "text-violet-300" },
  postgres: { id: "postgres", name: "PostgreSQL", Icon: SiPostgresql, colorClass: "text-indigo-300" },
  python: { id: "python", name: "Python", Icon: SiPython, colorClass: "text-yellow-300" },
  redis: { id: "redis", name: "Redis", Icon: SiRedis, colorClass: "text-rose-300" },
  mongo: { id: "mongo", name: "MongoDB", Icon: SiMongodb, colorClass: "text-emerald-300" },
  git: { id: "git", name: "Git", Icon: SiGit, colorClass: "text-orange-300" },
  ai: { id: "ai", name: "AI", Icon: FaRobot, colorClass: "text-fuchsia-300" },
  html: { id: "html", name: "HTML", Icon: SiHtml5, colorClass: "text-orange-400" },
  css: { id: "css", name: "CSS", Icon: SiCss3, colorClass: "text-sky-300" },
  javascript: { id: "javascript", name: "JavaScript", Icon: SiJavascript, colorClass: "text-yellow-300" },
  heroku: { id: "heroku", name: "Heroku", Icon: SiHeroku, colorClass: "text-violet-300" },
  canvas: { id: "canvas", name: "Canvas", Icon: FaPaintBrush, colorClass: "text-rose-300" },
  "linear-algebra": { id: "linear-algebra", name: "Linear Algebra", Icon: FaSuperscript, colorClass: "text-indigo-300" },
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
    <ul className="flex flex-wrap gap-1">
      {toolItems.map((item) => (
        <li key={item.id} title={item.name}>
          <span
            className={`flex h-8 w-8 items-center justify-center border border-white/15 bg-m-primary-ultradark ${item.colorClass}`}
          >
            <item.Icon className="h-4 w-4" aria-hidden />
            <span className="sr-only">{item.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ProjectToolIcons;
