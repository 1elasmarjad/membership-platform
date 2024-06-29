import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col items-center px-6 sm:max-w-xl sm:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        {children}
      </div>
    </div>
  );
}
