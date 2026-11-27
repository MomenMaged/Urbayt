import { useState, type CSSProperties } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Load immediately instead of when near the viewport (use for hero images). */
  eager?: boolean;
  onClick?: () => void;
}

/**
 * An image with a shimmering placeholder that fades in once loaded.
 * Each image tracks its own loading state.
 */
export default function SmartImage({ src, alt, className = "", style, eager, onClick }: SmartImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;

  return (
    <div
      className={`uh-img ${loaded ? "uh-img--loaded" : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setLoadedSrc(src)}
      />
    </div>
  );
}
