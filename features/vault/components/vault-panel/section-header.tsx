import React from "react";

export const SectionHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <p className="text-foreground text-sm font-bold">{title}</p>
    {children}
  </div>
);
