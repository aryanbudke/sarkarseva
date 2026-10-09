// This is file of your component
// You can use any dependencies from npm; we import them automatically in package.json

import { cn } from "@/src/lib/utils";
import React, { useState } from "react";

export const Component = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("w-full relative bg-transparent overflow-hidden", className)}>
  {/* Orange Soft Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, #FF7112, transparent)
      `,
      opacity: 0.3,
      mixBlendMode: "multiply",
    }}
  />
  <div className="relative z-10 w-full h-full">
    {children}
  </div>
</div>

  );
};

export default Component;
