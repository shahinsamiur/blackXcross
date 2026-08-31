import React from "react";

export function ContainerWraper({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx">
      <section>{children}</section>
    </div>
  );
}
