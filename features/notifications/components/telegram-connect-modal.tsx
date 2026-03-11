"use client";

import QRCode from "react-qr-code";
import { TelegramIcon } from "@/components/ui/icons";
import type { TelegramTab } from "../hooks/use-telegram-connect";
import { shortAddress } from "@/lib/utils";

interface TelegramConnectModalProps {
  modalOpen: boolean;
  onClose: () => void;
  activeTab: TelegramTab;
  onTabChange: (tab: TelegramTab) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
  qrUrl: string;
  address: string | undefined;
}

export function TelegramConnectModal({
  modalOpen,
  onClose,
  activeTab,
  onTabChange,
  inputValue,
  onInputChange,
  onSave,
  isSaving,
  qrUrl,
  address,
}: TelegramConnectModalProps) {
  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#2AABEE]/30 bg-[#2AABEE]/10 text-[#2AABEE]">
              <TelegramIcon className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Connect Telegram</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-card-2/60 hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex rounded-xl border border-border/50 bg-card-2/40 p-1">
          {(["manual", "qr"] as TelegramTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-[#2AABEE] text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tab === "manual" ? "Manual" : "Scan QR"}
            </button>
          ))}
        </div>

        {/* Tab: Manual */}
        {activeTab === "manual" && (
          <div className="space-y-4">
            <ol className="space-y-2.5 text-xs text-muted">
              {[
                <>
                  Open Telegram and start{" "}
                  <span className="font-semibold text-[#2AABEE]">@SentientAlertBot</span>
                </>,
                <>
                  Send the command{" "}
                  <code className="rounded bg-card-2/80 px-1.5 py-0.5 font-mono text-foreground">
                    /connect
                  </code>
                </>,
                "The bot replies with your Chat ID — paste it below",
              ].map((step, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#2AABEE]/40 bg-[#2AABEE]/10 text-[9px] font-bold text-[#2AABEE]">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted">
                Your Chat ID
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="e.g. 123456789"
                className="w-full rounded-xl border border-border/60 bg-card-2/40 px-3 py-2.5 text-sm font-mono text-foreground outline-none focus:border-[#2AABEE]/60"
              />
            </div>

            <button
              onClick={onSave}
              disabled={isSaving || !inputValue.trim()}
              className="w-full rounded-xl bg-[#2AABEE] py-2.5 text-xs font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving…" : "Save & Connect"}
            </button>
          </div>
        )}

        {/* Tab: QR */}
        {activeTab === "qr" && (
          <div className="space-y-4">
            <p className="text-xs text-muted">
              Scan with your phone to open{" "}
              <span className="font-semibold text-[#2AABEE]">@SentientAlertBot</span> directly in
              Telegram. The bot will reply with your Chat ID.
            </p>

            <div className="flex items-center justify-center rounded-xl border border-border/60 bg-white p-4">
              <QRCode value={qrUrl} size={160} />
            </div>

            {address && (
              <p className="text-center text-[10px] text-muted">
                Encodes your wallet:{" "}
                <span className="font-mono text-foreground">{shortAddress(address)}</span>
              </p>
            )}

            <div className="border-t border-border/40 pt-3 space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Paste Chat ID from bot reply
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder="e.g. 123456789"
                  className="w-full rounded-xl border border-border/60 bg-card-2/40 px-3 py-2.5 text-sm font-mono text-foreground outline-none focus:border-[#2AABEE]/60"
                />
              </div>

              <button
                onClick={onSave}
                disabled={isSaving || !inputValue.trim()}
                className="w-full rounded-xl bg-[#2AABEE] py-2.5 text-xs font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving…" : "Save & Connect"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
