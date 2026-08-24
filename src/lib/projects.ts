export type Project = {
  description: string;
  link?: string;
  image: string;
  imageSrcSet?: string;
  imageWidth?: number;
  imageHeight?: number;
  code: string;
  caseStudy?: string;
  tools?: string[];
  privateCode?: boolean;
  tags?: string[];
  built: string;
  hackathonWin?: boolean;
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function formatBuiltMonthYear(built: string): string {
  const [year, month] = built.split("-").map(Number);
  return monthFormatter.format(new Date(year, month - 1, 1));
}

export function builtYear(built: string): string {
  return built.slice(0, 4);
}

export function compareBuiltDesc(a: string, b: string): number {
  return b.localeCompare(a);
}

export function isAiProject(name: string, built: string): boolean {
  if (name === "Multyx.io") {
    return false;
  }

  return Number(builtYear(built)) >= 2025;
}
