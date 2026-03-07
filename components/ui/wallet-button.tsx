'use client'

import { useState, useRef, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, ChevronDown, LogOut, Copy, Check } from 'lucide-react'

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function ConnectorIcon({ name }: { name: string }) {
  const lower = name.toLowerCase()
  if (lower.includes('metamask')) return <span className="text-sm">🦊</span>
  if (lower.includes('coinbase')) return <span className="text-sm">🔵</span>
  if (lower.includes('walletconnect')) return <span className="text-sm">🔗</span>
  return <Wallet className="h-3.5 w-3.5" />
}

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close modal when connected
  useEffect(() => {
    if (isConnected) setModalOpen(false)
  }, [isConnected])

  function copyAddress() {
    if (!address) return
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (isConnected && address) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-card/80"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {shortenAddress(address)}
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-10 z-50 w-52 rounded-xl border border-border/60 bg-card p-1 shadow-xl">
            <button
              onClick={copyAddress}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-background/60"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-muted" />}
              {copied ? 'Copied!' : 'Copy address'}
            </button>
            <div className="my-1 h-px bg-border/40" />
            <button
              onClick={() => { disconnect(); setDropdownOpen(false) }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95"
      >
        Connect Wallet
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Connect Wallet</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-muted transition-colors hover:bg-background/60 hover:text-foreground"
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
                  className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 disabled:opacity-50"
                >
                  <ConnectorIcon name={connector.name} />
                  {connector.name}
                </button>
              ))}
            </div>

            {isPending && (
              <p className="mt-4 text-center text-xs text-muted">Waiting for approval…</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
