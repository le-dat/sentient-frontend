"use client";

import { useState } from "react";
import { formatError } from "@/lib/utils";

const TEXT_LIMIT = 50; // words

interface ErrorDescriptionProps {
  message: unknown;
}

export function ErrorDescription({ message }: ErrorDescriptionProps) {
  const formatted = formatError(message);
  const words = formatted.split(" ");
  const isLong = words.length > TEXT_LIMIT;
  const [expanded, setExpanded] = useState(false);
  const text = isLong && !expanded ? words.slice(0, TEXT_LIMIT).join(" ") + "…" : formatted;

  return (
    <span className="block text-xs max-h-24 overflow-y-auto overflow-wrap-normal">
      {text}
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 underline opacity-70 hover:opacity-100"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </span>
  );
}
