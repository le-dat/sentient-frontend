# Sentient Frontend

Professor-style FE structure setup for fast implementation.

## Implemented structure

### Maintainability architecture (UI / Logic / Mock data)

This repo now follows a separation pattern for dashboard implementation:
- **UI layer**: route/page components in `app/*`
- **View-model / logic layer**: `lib/view-models/*`
- **Mock data layer**: `lib/mockdata/*`
- **Types/contracts**: `lib/types/*`

Pattern examples:
- `app/dashboard/page.tsx` + `lib/view-models/use-dashboard-view-model.ts`
- `app/dashboard/monitor/page.tsx` + `lib/view-models/use-monitor-view-model.ts`
- `app/dashboard/notifications/page.tsx` + `lib/view-models/use-notifications-view-model.ts`
- data source in `lib/mockdata/*`, contracts in `lib/types/*`

Use the same pattern for `vault` pages to keep future API wiring clean.

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
