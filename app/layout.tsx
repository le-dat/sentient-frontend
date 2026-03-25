import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ProvidersWrapper } from "./providers-wrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://sentient-fe.vercel.app"),
  title: {
    default: "Sentient Finance — DeFi Vault Automation",
    template: "%s | Sentient Finance",
  },
  description:
    "Automate your DeFi vaults with on-chain intelligence. Set price rules, execute swaps, and shield capital across every EVM chain.",
  openGraph: {
    title: "Sentient Finance — DeFi Vault Automation",
    description:
      "Automate your DeFi vaults with on-chain intelligence. Set price rules, execute swaps, and shield capital across every EVM chain.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Sentient Finance" }],
  },
  twitter: {
    card: "summary",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} ${jetBrainsMono.variable} antialiased`}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
