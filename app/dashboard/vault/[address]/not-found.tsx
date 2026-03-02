import Link from "next/link";
import { PageState } from "@/components/ui/page-state";

export default function VaultNotFound() {
  return (
    <PageState
      title="Vault not found"
      description="This vault address was not found on the selected network."
      action={
        <Link href="/dashboard" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">
          Back to dashboard
        </Link>
      }
    />
  );
}
