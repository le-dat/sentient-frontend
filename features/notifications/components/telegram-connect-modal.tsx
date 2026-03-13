"use client";

import { TelegramIcon } from "@/components/ui/icons";
import { TELEGRAM_BOT_URL, TELEGRAM_BOT_USERNAME } from "@/lib/constants";

interface TelegramConnectModalProps {
  modalOpen: boolean;
  onClose: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function TelegramConnectModal({
  modalOpen,
  onClose,
  inputValue,
  onInputChange,
  onSave,
  isSaving,
}: TelegramConnectModalProps) {
  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl border border-border/60 bg-card pb-8 pt-6 shadow-2xl sm:rounded-2xl sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border sm:hidden" />

        {/* Header */}
        <div className="mb-1 flex items-center justify-between px-6">
          <h2 className="text-base font-semibold text-foreground">Get Telegram alerts</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-card-2/60 hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="px-6 space-y-4">
          {/* Step 1 — Open the bot (primary CTA) */}
          <div className="rounded-2xl border border-border/60 bg-card-2/40 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Step 1 — Open the bot
            </p>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2AABEE] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90"
            >
              <TelegramIcon className="h-4 w-4" />
              @{TELEGRAM_BOT_USERNAME}
            </a>
          </div>

          {/* Step 2 — Send /connect */}
          <div className="rounded-2xl border border-border/60 bg-card-2/40 p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Step 2 — Send a message
            </p>
            <p className="text-xs text-muted">
              In the bot chat, send{" "}
              <code className="rounded-md bg-card-3 px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground">
                /connect
              </code>
              . The bot will reply with your ID.
            </p>
          </div>

          {/* Step 3 — Paste ID */}
          <div className="rounded-2xl border border-border/60 bg-card-2/40 p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Step 3 — Paste your ID here
            </p>
            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Number the bot sent you"
              className="w-full rounded-xl border border-border/60 bg-card/60 px-3 py-2.5 text-sm font-mono text-foreground outline-none placeholder:text-muted/50 focus:border-[#2AABEE]/60"
            />
          </div>

          <button
            onClick={onSave}
            disabled={isSaving || !inputValue.trim()}
            className="w-full rounded-xl bg-[#2AABEE] py-3 text-sm font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? "Connecting…" : "Save & Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}
