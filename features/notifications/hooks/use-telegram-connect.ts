"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { appendToHistory } from "../lib/notification-history";

const STORAGE_KEY = "telegram_chat_id";

export function useTelegramConnect() {
  const { address } = useAccount();

  const [chatId, setChatId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setChatId(stored);
    setHydrated(true);
  }, []);

  const isConnected = hydrated && chatId !== null;

  const maskedChatId = chatId
    ? `${chatId.slice(0, 5)}${"*".repeat(Math.max(0, chatId.length - 5))}`
    : null;

  function openModal() {
    setInputValue("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setInputValue("");
  }

  async function sendTelegramMessage(id: string, message: string): Promise<boolean> {
    const res = await fetch("/api/telegram/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: id, message }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error((data as { error?: string })?.error ?? "Failed to send Telegram message.");
      return false;
    }
    return true;
  }

  async function handleSave() {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      toast.error("Please enter your Telegram Chat ID.");
      return;
    }
    if (!/^-?\d+$/.test(trimmed)) {
      toast.error("Chat ID must be a number.");
      return;
    }
    setIsSaving(true);
    try {
      const ok = await sendTelegramMessage(
        trimmed,
        "✅ Connected! Sentient Finance alerts are now active for this account."
      );
      if (!ok) return;
      localStorage.setItem(STORAGE_KEY, trimmed);
      setChatId(trimmed);
      toast.success("Telegram connected successfully.");
      closeModal();
    } catch {
      toast.error("Network error. Could not verify Telegram ID.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleDisconnect() {
    localStorage.removeItem(STORAGE_KEY);
    setChatId(null);
    toast.success("Telegram disconnected.");
  }

  const handleTest = useCallback(async () => {
    if (!chatId) {
      toast.error("Connect Telegram first.");
      return;
    }
    setIsTesting(true);
    try {
      const ok = await sendTelegramMessage(
        chatId,
        "✅ Test notification from Sentient Finance. Your alerts are working."
      );
      if (ok) {
        toast.success("Test message sent to Telegram.");
        appendToHistory({
          type: "TestAlert",
          vault: "—",
          chain: "—",
          dot: "bg-primary",
          textColor: "text-primary",
        });
      }
    } catch {
      toast.error("Network error. Could not reach Telegram.");
    } finally {
      setIsTesting(false);
    }
  }, [chatId]);

  return {
    isConnected,
    hydrated,
    maskedChatId,
    address,
    modalOpen,
    openModal,
    closeModal,
    inputValue,
    setInputValue,
    handleSave,
    handleDisconnect,
    handleTest,
    isSaving,
    isTesting,
  };
}
