import { type NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendMessage(chatId: number | string, text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

async function answerCallbackQuery(callbackQueryId: string, text?: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text ?? "",
      show_alert: false,
    }),
  });
}

async function editMessageReplyMarkup(
  chatId: number | string,
  messageId: number,
): Promise<void> {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageReplyMarkup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: [] },
    }),
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 500 });
  }

  let update: Record<string, unknown>;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Handle text commands: /start, /connect
  if (update.message) {
    const message = update.message as {
      chat: { id: number };
      text?: string;
      message_id: number;
    };
    const chatId = message.chat.id;
    const text = message.text ?? "";

    if (text.startsWith("/start")) {
      const parts = text.split(" ");
      const walletArg = parts[1] ?? "";
      const isWallet = /^0x[a-fA-F0-9]{40}$/.test(walletArg);

      if (isWallet) {
        await sendMessage(
          chatId,
          `Connected! Your Chat ID is: <code>${chatId}</code>\n\nVault wallet: <code>${walletArg}</code>\n\nPaste your Chat ID into the Sentient app to complete setup.`,
        );
      } else {
        await sendMessage(
          chatId,
          `Welcome to Sentient Finance Bot!\n\nYour Chat ID is: <code>${chatId}</code>\n\nPaste this into the app to connect alerts.`,
        );
      }
    } else if (text === "/connect") {
      await sendMessage(
        chatId,
        `Your Chat ID is: <code>${chatId}</code>\n\nCopy this and paste it into the Sentient app.`,
      );
    }
  }

  // Handle inline button callback_query
  if (update.callback_query) {
    const cq = update.callback_query as {
      id: string;
      data?: string;
      message?: { chat: { id: number }; message_id: number };
    };

    const data = cq.data ?? "";
    const chatId = cq.message?.chat.id;
    const messageId = cq.message?.message_id;

    if (data.startsWith("dismiss:") && chatId && messageId) {
      await editMessageReplyMarkup(chatId, messageId);
      await answerCallbackQuery(cq.id, "Dismissed.");
    } else {
      await answerCallbackQuery(cq.id);
    }
  }

  // Always return 200 — Telegram retries on non-200 for up to 24h
  return NextResponse.json({ ok: true });
}
