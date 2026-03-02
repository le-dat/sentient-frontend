# Sentient Frontend

Professor-style FE structure setup for fast implementation.

## Implemented structure

- `/` Landing (workflow + visual direction)
- `/app` Dashboard skeleton
- `/app/vault/new` Create vault skeleton
- `/app/vault/[address]` Vault detail skeleton
- `/app/notifications` Telegram notification setup skeleton
- `/app/monitor` Execution/health log skeleton

## Shared UI primitives

- `components/layout/app-shell.tsx`
- `components/ui/section-card.tsx`
- `components/ui/status-chip.tsx`

## Design base

Color tokens in `app/globals.css`:
- `--primary`, `--success`, `--warning`, `--danger`
- `--card`, `--card-2`, `--border`
- consistent dark DeFi dashboard baseline

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
