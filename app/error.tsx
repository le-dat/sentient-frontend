"use client";

import { PageState } from "@/components/ui/page-state";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <PageState
          variant="error"
          title="Something went wrong"
          description="Unexpected app error. Please retry."
          action={
            <button
              onClick={reset}
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-semibold"
            >
              Try again
            </button>
          }
        />
      </body>
    </html>
  );
}
