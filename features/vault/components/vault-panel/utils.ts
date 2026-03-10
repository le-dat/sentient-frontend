export const parseTokens = (balance: string) => {
  if (!balance || balance === "—") return [];
  return balance.split(" / ").map((part) => {
    const trimmed = part.trim();
    const lastSpace = trimmed.lastIndexOf(" ");
    return { amount: trimmed.slice(0, lastSpace), symbol: trimmed.slice(lastSpace + 1) };
  });
};

export const parsePrices = (rule: string) => ({
  buy: rule.match(/Buy\s*[<>]\s*\$([0-9,]+)/)?.[1].replace(/,/g, "") ?? "",
  sell: rule.match(/Sell\s*[<>]\s*\$([0-9,]+)/)?.[1].replace(/,/g, "") ?? "",
});
