const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  if (normalizeSrc(src).includes("supabase")) {
    return normalizeSrc(src);
  } else {
    return `https://raw.githubusercontent.com/Shubhamai/AISandbox/main/public/${normalizeSrc(
      src
    )}`;
  }
}
