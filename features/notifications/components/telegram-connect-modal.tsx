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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        className="border-border/60 bg-card w-full max-w-sm rounded-t-3xl border pt-6 pb-8 shadow-2xl md:rounded-2xl md:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="bg-border mx-auto mb-5 h-1 w-10 rounded-full md:hidden" />

        {/* Header */}
        <div className="mb-1 flex items-center justify-between px-6">
          <h2 className="text-foreground text-base font-semibold">Get Telegram alerts</h2>
          <button
            onClick={onClose}
            className="text-muted hover:bg-card-2/60 hover:text-foreground rounded-lg p-1.5 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 px-6">
          {/* Step 1 — Open the bot (primary CTA) */}
          <div className="border-border/60 bg-card-2/40 rounded-2xl border p-4">
            <p className="text-muted mb-3 text-[11px] font-semibold tracking-wider uppercase">
              Step 1 — Open the bot
            </p>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2AABEE] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90"
            >
              <TelegramIcon className="h-4 w-4" />@{TELEGRAM_BOT_USERNAME}
            </a>
          </div>

          {/* Step 2 — Send /connect */}
          <div className="border-border/60 bg-card-2/40 rounded-2xl border p-4">
            <p className="text-muted mb-1.5 text-[11px] font-semibold tracking-wider uppercase">
              Step 2 — Send a message
            </p>
            <p className="text-muted text-xs">
              In the bot chat, send{" "}
              <code className="bg-card-3 text-foreground rounded-md px-1.5 py-0.5 font-mono text-xs font-semibold">
                /connect
              </code>
              . The bot will reply with your ID.
            </p>
          </div>

          {/* Step 3 — Paste ID */}
          <div className="border-border/60 bg-card-2/40 rounded-2xl border p-4">
            <p className="text-muted mb-2 text-[11px] font-semibold tracking-wider uppercase">
              Step 3 — Paste your ID here
            </p>
            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Number the bot sent you"
              className="border-border/60 bg-card/60 text-foreground placeholder:text-muted/50 w-full rounded-xl border px-3 py-2.5 font-mono text-sm outline-none focus:border-[#2AABEE]/60"
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
