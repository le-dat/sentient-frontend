"use client";

import { useNotifications } from "@/features/notifications";
import { useTelegramConnect } from "@/features/notifications/hooks/use-telegram-connect";
import { ConnectionsRow } from "@/features/notifications/components/connections-row";
import { RecentNotifications } from "@/features/notifications/components/recent-notifications";
import { AlertPreferences } from "@/features/notifications/components/alert-preferences";
import { TelegramConnectModal } from "@/features/notifications/components/telegram-connect-modal";

export default function NotificationsPage() {
  const { alertPrefs, togglePref, recentNotifications } = useNotifications();
  const {
    isConnected,
    hydrated,
    maskedChatId,
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
  } = useTelegramConnect();

  return (
    <div className="space-y-5">
      <ConnectionsRow
        hydrated={hydrated}
        isConnected={isConnected}
        maskedChatId={maskedChatId}
        isTesting={isTesting}
        onConnect={openModal}
        onDisconnect={handleDisconnect}
        onTest={handleTest}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RecentNotifications notifications={recentNotifications} />
        <AlertPreferences prefs={alertPrefs} onToggle={togglePref} />
      </div>

      <TelegramConnectModal
        modalOpen={modalOpen}
        onClose={closeModal}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
