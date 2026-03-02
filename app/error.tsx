"use client";

import { PageState } from "@/components/ui/page-state";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <PageState
          title="Something went wrong"
          description="Unexpected app error. Please retry."
          action={
            <button
              onClick={reset}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white"
            >
              Try again
            </button>
          }
        />
      </body>
    </html>
  );
}
