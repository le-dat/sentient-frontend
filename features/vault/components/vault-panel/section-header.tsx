import React from "react";

export const SectionHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <p className="text-sm font-bold text-foreground">{title}</p>
    {children}
  </div>
);
