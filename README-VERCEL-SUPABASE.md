# Vercel + Supabase setup for this project

This file contains step-by-step instructions to link this repository to Vercel and Supabase, including MCP (Model Context Protocol) integration notes.

Prerequisites
- Install Node.js (includes `npm`). Download from https://nodejs.org
- Have active accounts for Vercel (https://vercel.com) and Supabase (https://supabase.com)

Install CLIs

```powershell
npm install -g vercel
npm install -g supabase
```

Login (interactive)

```powershell
vercel login
supabase login
```

Create or link a Supabase project

1. In the Supabase dashboard create a new project (or use an existing one).
2. In the project settings -> API, copy the `URL` and `anon` and `service_role` keys.

Create or link a Vercel project

From the repo root, run:

```powershell
vercel link      # link to an existing Vercel project or create a new one
vercel --prod    # deploy to production
```

Add environment variables to Vercel

Use the dashboard or CLI to set env vars (recommended: via dashboard for secrets):

Dashboard: Project Settings -> Environment Variables:
- `SUPABASE_URL` = <your-supabase-url>
- `SUPABASE_ANON_KEY` = <your-anon-key>
- `SUPABASE_SERVICE_ROLE_KEY` = <your-service-role-key>

Or with CLI:

```powershell
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

MCP (Model Context Protocol) integration

- If you plan to run an MCP-compatible model backend that uses Supabase for state/storage, create a secure server component (Edge Function or Serverless API) that uses the `SERVICE_ROLE` key and does not expose it to the browser.
- Store the service role key as a Vercel environment variable (masked) and call Supabase from server-side code.

Deployment details
- This repo is a static site; `vercel.json` is included to serve HTML/CSS from Vercel.
- After linking, run `vercel --prod` to deploy.

If you want, I can run the CLI commands here after you install Node/npm, or you can follow these steps and tell me where you need help.
