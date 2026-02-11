import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

const MCP_URL = process.env.MCP_SUPABASE_URL || 'https://mcp.supabase.com/mcp?project_ref=pwettgcewfcxkezwxbjy'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Optional: log the incoming request to Supabase
    if (supabase) {
      try {
        await supabase.from('mcp_logs').insert([{
          input: body.input || null,
          metadata: body.metadata || null,
          created_at: new Date().toISOString(),
        }])
      } catch {
        // ignore logging errors
      }
    }

    // Forward the request to the Supabase MCP endpoint
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (supabaseKey) {
      headers['Authorization'] = `Bearer ${supabaseKey}`
    }

    const resp = await fetch(MCP_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const text = await resp.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }

    // Optional: log response
    if (supabase) {
      try {
        await supabase.from('mcp_logs').insert([{
          input: body.input || null,
          metadata: { response: data },
          created_at: new Date().toISOString(),
        }])
      } catch {
        // ignore
      }
    }

    return NextResponse.json(data, { status: resp.status })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
