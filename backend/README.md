# Quantix Backend

Dedicated backend service separated from the Next.js app.

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Copy environment file and set MongoDB values:

   ```bash
   cp .env.example .env
   ```

3. Start backend:

   ```bash
   bun run dev
   ```

## Endpoints

- `GET /api/health`
- `POST /api/contact`
