import { ReactNode } from "react";

type TornCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TornCard({ children, className = "" }: TornCardProps) {
  return (
    <div
      className={`torn-edge-top relative rounded-b-lg border border-paper bg-white/60 pt-6 ${className}`}
    >
      {children}
    </div>
  );
}
