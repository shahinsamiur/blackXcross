import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingCard({
  side,
  name,
  caption,
  delay,
  imageUrl,
}: {
  side: "left" | "right";
  name: string;
  caption: string;
  delay: number;
  imageUrl?: string;
}) {
  const isLeft = side === "left";

  // Feather the photo itself into transparency — top corners soft,
  // bottom/sides fade out gradually so the page background shows through.
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 95%)",
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskImage: "linear-gradient(to bottom, black 55%, transparent 95%)",
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: isLeft ? -8 : 8 }}
      animate={{ opacity: 1, y: 0, rotate: isLeft ? -6 : 6 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        isLeft
          ? "left-4 md:left-8 lg:left-16"
          : "right-4 md:right-8 lg:right-16"
      }`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
        className="relative w-48 md:w-56 lg:w-64"
      >
        {/* No card box, no bg-white wrapper — the photo fades directly into the page */}
        <div
          className="relative aspect-3/4 w-full rounded-2xl!"
          style={maskStyle}
        >
          {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-white via-white/90 to-white flex items-center justify-center">
              <div className="text-6xl">{isLeft ? "👨‍💼" : "‍💼"}</div>
            </div>
          )}
        </div>

        {/* Caption sits over the fade, no background block behind it */}
        {/* <div className="relative  px-2 z-10 ">
          <p
            className={`text-sm font-medium ${
              isLeft ? "text-left" : "text-right"
            }`}
          >
            <span className="font-semibold text-gray-900">{name}</span>
            <span className="text-gray-500">{caption}</span>
          </p>
        </div> */}
      </motion.div>
    </motion.div>
  );
}
