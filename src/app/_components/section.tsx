import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center">{children}</div>
    </div>
  );
}
