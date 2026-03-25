import Link from "next/link";
import { PageState } from "@/components/ui/page-state";

export default function NotFound() {
  return (
    <PageState
      variant="not-found"
      title="Page not found"
      description="The page you requested does not exist or has moved."
      action={
        <Link
          href="/"
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-semibold"
        >
          Back to home
        </Link>
      }
    />
  );
}
