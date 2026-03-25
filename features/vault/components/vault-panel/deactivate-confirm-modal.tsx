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
        className="border-border bg-card w-[300px] rounded-2xl border shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center px-6 pt-6 pb-4 text-center">
          <div className="border-danger/30 bg-danger/10 mb-3 flex h-10 w-10 items-center justify-center rounded-full border">
            <Power className="text-danger h-4 w-4" />
          </div>
          <p className="text-foreground text-sm font-semibold">Deactivate this vault?</p>
          <p className="text-muted mt-1 text-xs">
            The vault will stop executing automated strategies.
          </p>
        </div>
        <div className="border-border/40 flex gap-2 border-t px-5 py-4">
          <button
            onClick={onCancel}
            className="border-border/60 text-muted hover:text-foreground flex-1 rounded-lg border py-2 text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-danger/15 border-danger/30 text-danger hover:bg-danger/25 flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}
