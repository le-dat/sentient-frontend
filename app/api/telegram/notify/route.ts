import { type NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL 

type ActionType = "emergency-shield" | "info";

interface NotifyRequest {
  chatId: string;
  message: string;
  vaultAddress?: string;
  actionType?: ActionType;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 500 });
  }

  let body: NotifyRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { chatId, message, vaultAddress, actionType } = body;

  if (!chatId || !message) {
    return NextResponse.json({ error: "chatId and message are required" }, { status: 400 });
  }

  // Build inline keyboard for emergency-shield alerts
  let reply_markup: object | undefined;
  if (actionType === "emergency-shield" && vaultAddress) {
    const deepLink = `${APP_BASE_URL}/dashboard/ccip?vault=${vaultAddress}&prefill=shield`;
    reply_markup = {
      inline_keyboard: [
        [{ text: "🛡️ Execute Emergency Shield", url: deepLink }],
        [{ text: "✅ Dismiss", callback_data: `dismiss:${vaultAddress}` }],
      ],
    };
  }

  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
    ...(reply_markup ? { reply_markup } : {}),
  };

  const upstream = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await upstream.json();

  if (!upstream.ok) {
    return NextResponse.json(
      { error: (data as { description?: string })?.description ?? "Telegram API error" },
      { status: upstream.status },
    );
  }

  return NextResponse.json({ ok: true, messageId: (data as { result?: { message_id: number } })?.result?.message_id });
}
