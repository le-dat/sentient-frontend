import Link from "next/link";
import { PageState } from "@/components/ui/page-state";

export default function DashboardNotFound() {
  return (
    <PageState
      title="Dashboard route not found"
      description="This dashboard page does not exist."
      action={
        <Link href="/dashboard" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">
          Back to dashboard
        </Link>
      }
    />
  );
}
