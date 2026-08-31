import Image from "next/image";

export default function ProfileAvatar({
  src,
  alt,
  size = 44,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full ring-1 ring-primary/30"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover grayscale contrast-125"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-primary mix-blend-multiply opacity-70"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,var(--background)_115%)] opacity-70"
      />
    </span>
  );
}
