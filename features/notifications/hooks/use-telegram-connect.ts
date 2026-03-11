"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const STORAGE_KEY = "telegram_chat_id";
const BOT_USERNAME = "SentientAlertBot";

export type TelegramTab = "manual" | "qr";

export function useTelegramConnect() {
  const { address } = useAccount();

  // Connection state — hydrated from localStorage on mount
  const [chatId, setChatId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TelegramTab>("manual");

  // Input field (shared between Manual and QR tabs)
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Hydrate from localStorage exactly once on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setChatId(stored);
    setHydrated(true);
  }, []);

  const isConnected = hydrated && chatId !== null;

  // Masked display: "123456789" → "12345****"
  const maskedChatId = chatId
    ? `${chatId.slice(0, 5)}${"*".repeat(Math.max(0, chatId.length - 5))}`
    : null;

  // QR URL — encodes the wallet address as the /start payload
  const qrUrl = address
    ? `https://t.me/${BOT_USERNAME}?start=${address}`
    : `https://t.me/${BOT_USERNAME}`;

  function openModal() {
    setInputValue("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setInputValue("");
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
      localStorage.setItem(STORAGE_KEY, trimmed);
      setChatId(trimmed);
      toast.success("Telegram connected successfully.");
      closeModal();
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
      const res = await fetch("/api/telegram/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          message: "✅ Test notification from Sentient Finance. Your alerts are working.",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error((data as { error?: string })?.error ?? "Failed to send test message.");
      } else {
        toast.success("Test message sent to Telegram.");
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
    chatId,
    maskedChatId,
    address,
    qrUrl,
    modalOpen,
    openModal,
    closeModal,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    handleSave,
    handleDisconnect,
    handleTest,
    isSaving,
    isTesting,
  };
}
