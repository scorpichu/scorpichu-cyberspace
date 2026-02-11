const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// MCP endpoint you provided can be set via env or falls back to the example
const MCP_URL = process.env.MCP_SUPABASE_URL || 'https://mcp.supabase.com/mcp?project_ref=pwettgcewfcxkezwxbjy'

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = req.body || {}

    // optional: log the incoming request to Supabase (safe fail)
    try {
      await supabase.from('mcp_logs').insert([{ input: body.input || null, metadata: body.metadata || null, created_at: new Date().toISOString() }])
    } catch (e) {
      // ignore logging errors
      console.warn('mcp_logs insert failed', e && e.message)
    }

    // forward the request to the Supabase MCP endpoint
    const headers = {
      'Content-Type': 'application/json'
    }
    // attach service role key as Bearer auth (keep this key server-side!)
    if (supabaseKey) headers['Authorization'] = `Bearer ${supabaseKey}`

    const resp = await fetch(MCP_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      // credentials should not be exposed
    })

    const text = await resp.text()
    let data
    try { data = JSON.parse(text) } catch { data = text }

    // optional: log response
    try {
      await supabase.from('mcp_logs').insert([{ input: body.input || null, metadata: { response: data }, created_at: new Date().toISOString() }])
    } catch (e) {
      /* ignore */
    }

    res.status(resp.status).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) })
  }
}

