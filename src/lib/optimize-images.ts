import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const assetsByFilename = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(imageModules)) {
  const filename = path.split("/").pop();
  if (filename) {
    assetsByFilename.set(filename, mod.default);
  }
}

export type OptimizedImage = {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
};

export async function optimizeLocalImage(
  filename: string,
  width: number
): Promise<OptimizedImage> {
  const asset = assetsByFilename.get(filename);
  if (!asset) {
    return { src: filename.startsWith("/") ? filename : `/images/${filename}` };
  }

  const image = await getImage({
    src: asset,
    width,
    format: "webp",
    quality: 75,
    densities: [1, 2],
  });

  return {
    src: image.src,
    srcSet: image.srcSet.attribute,
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
  };
}

type ProjectWithImage = {
  image: string;
  [key: string]: unknown;
};

export async function withOptimizedProjectImages<T extends ProjectWithImage>(
  projects: Record<string, T>,
  width = 800
): Promise<Record<string, T & { imageSrcSet?: string; imageWidth?: number; imageHeight?: number }>> {
  const entries = await Promise.all(
    Object.entries(projects).map(async ([name, project]) => {
      const optimized = await optimizeLocalImage(project.image, width);
      return [
        name,
        {
          ...project,
          image: optimized.src,
          imageSrcSet: optimized.srcSet,
          imageWidth: optimized.width,
          imageHeight: optimized.height,
        },
      ] as const;
    })
  );
  return Object.fromEntries(entries);
}
