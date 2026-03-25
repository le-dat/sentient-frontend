"use client";

import { useState, useRef, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet, ChevronDown, LogOut, Copy, Check } from "lucide-react";
import { shortAddress } from "@/lib/utils";

function ConnectorIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("metamask")) return <span className="text-sm">🦊</span>;
  if (lower.includes("coinbase")) return <span className="text-sm">🔵</span>;
  if (lower.includes("walletconnect")) return <span className="text-sm">🔗</span>;
  return <Wallet className="h-3.5 w-3.5" />;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function copyAddress() {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (isConnected && address) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="border-border/60 bg-card text-foreground hover:bg-card/80 flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {shortAddress(address)}
          <ChevronDown className="text-muted h-3.5 w-3.5" />
        </button>

        {dropdownOpen && (
          <div className="border-border/60 bg-card absolute top-10 right-0 z-50 w-52 rounded-xl border p-1 shadow-xl">
            <button
              onClick={copyAddress}
              className="text-foreground hover:bg-background/60 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Copy className="text-muted h-3.5 w-3.5" />
              )}
              {copied ? "Copied!" : "Copy address"}
            </button>
            <div className="bg-border/40 my-1 h-px" />
            <button
              onClick={() => {
                disconnect();
                setDropdownOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="from-primary to-primary/80 shadow-primary/20 hover:shadow-primary/35 rounded-full bg-gradient-to-r px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95"
      >
        Connect Wallet
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="border-border/60 bg-card w-full max-w-sm rounded-2xl border p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-foreground text-base font-semibold">Connect Wallet</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted hover:bg-background/60 hover:text-foreground rounded-lg p-1 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                  className="border-border/40 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all disabled:opacity-50"
                >
                  <ConnectorIcon name={connector.name} />
                  {connector.name}
                </button>
              ))}
            </div>

            {isPending && (
              <p className="text-muted mt-4 text-center text-xs">Waiting for approval…</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
