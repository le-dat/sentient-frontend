"use client";

import { ReactNode } from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function BenefitCard({
  title,
  description,
  icon,
  className = "",
}: BenefitCardProps) {
  return (
    <div
      className={`group relative flex flex-col items-start justify-between rounded-3xl border border-border bg-card/50 p-8 transition-all duration-300 hover:border-foreground hover:bg-card-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-base text-muted transition-colors group-hover:text-foreground/80">
          {description}
        </p>
      </div>

      <div className="relative mt-8 h-32 w-full">
        <div className="absolute bottom-0 left-0 transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
}
