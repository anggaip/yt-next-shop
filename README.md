# Next Shop

Composable commerce starter built with Next.js (App Router), TypeScript, Tailwind CSS, and TanStack Query. It ships typed API helpers, ready-to-use UI primitives (buttons, inputs, select, toast, etc.), and sensible defaults for data fetching and styling.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 with container, neutral palette, and font tokens
- TanStack Query with a shared `QueryProvider` and hydration helpers
- Typed fetch utility powered by the Fetch API + Zod validation
- Radix UI primitives, class-variance-authority, lucide-react icons, and react-hook-form ready for forms

## Getting Started
1. Copy environment variables and adjust the base URLs:
   ```bash
   cp .env.example .env.local
   ```
2. Install dependencies (already done if you generated this repo with `create-next-app`):
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Build or lint when needed:
   ```bash
   npm run build
   npm run start
   npm run lint
   ```

## Environment Variables
| Name | Description |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the typed fetch client in `src/lib/api.ts`. |
| `NEXT_PUBLIC_ASSET_BASE_URL` | CDN or asset host for media (use inside your features/components). |

See `.env.example` for sample values.

## Import Aliases
The project uses the default alias from `tsconfig.json`:
- `@/lib/*` → shared utilities such as `api`, `types`, `queryClient`, `utils`.
- `@/components/*` → UI primitives (buttons, inputs, select, toast, etc.) and future feature components.

Import them like this:
```ts
import { QueryProvider } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
```

## API Helper Usage
```ts
import { z } from "zod";
import { apiFetch } from "@/lib/api";

const productSchema = z.object({ id: z.string(), name: z.string() });
const product = await apiFetch("/products/sku-123", { schema: productSchema });
```

The helper automatically prefixes `NEXT_PUBLIC_API_BASE_URL`, enforces timeouts, validates with Zod (when provided), and throws an `ApiError` with the response payload when the request fails.

## UI Toolkit
Reusable primitives live in `src/components/ui`:
- `button`, `input`, `select`, `badge`, `skeleton`
- `toast`, `toaster`, and `use-toast` built on Radix Toast + lucide icons

They all share Tailwind tokens (font, color, border radius) configured in `tailwind.config.ts` and `src/app/globals.css`.

## Data Layer
`src/lib/queryClient.ts` exports a singleton-aware `QueryProvider` that wraps the app inside `src/app/layout.tsx`. Use TanStack Query hooks inside your components without reconfiguring the client.
