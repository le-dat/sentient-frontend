import Link from "next/link";
import { PageState } from "@/components/ui/page-state";

export default function NotFound() {
  return (
    <PageState
      variant="not-found"
      title="Page not found"
      description="The page you requested does not exist or has moved."
      action={
        <Link href="/" className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">
          Back to home
        </Link>
      }
    />
  );
}
