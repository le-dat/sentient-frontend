"use client";
import { Power } from "lucide-react";

interface DeactivateConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeactivateConfirmModal({ onCancel, onConfirm }: DeactivateConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-[300px] rounded-2xl border border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center px-6 pt-6 pb-4 text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-danger/30 bg-danger/10">
            <Power className="h-4 w-4 text-danger" />
          </div>
          <p className="text-sm font-semibold text-foreground">Deactivate this vault?</p>
          <p className="mt-1 text-xs text-muted">
            The vault will stop executing automated strategies.
          </p>
        </div>
        <div className="flex gap-2 border-t border-border/40 px-5 py-4">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border/60 py-2 text-xs text-muted transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-danger/15 border border-danger/30 py-2 text-xs font-semibold text-danger transition-colors hover:bg-danger/25"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}
