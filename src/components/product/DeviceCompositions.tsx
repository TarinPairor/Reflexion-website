import Image from "next/image";

export function MirrorScene({
  compact = false,
  imageSrc = "/reflexion-assets/generated/phase1/reflexion-mirror-home.webp",
  imageAlt = "A source-grounded visualisation of the real 21.5-inch Reflexion Mirror in a warm home setting",
}: {
  compact?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return <div className={`mirror-scene ${compact ? "mirror-scene--compact" : ""}`}>
    <Image
      className="mirror-scene__photo"
      src={imageSrc}
      alt={imageAlt}
      fill
      loading={compact ? "lazy" : "eager"}
      fetchPriority={compact ? "auto" : "high"}
      sizes={compact ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 58vw"}
    />
  </div>;
}
