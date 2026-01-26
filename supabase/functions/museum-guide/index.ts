import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a warm, enthusiastic historical guide at Fort St. George Museum in Chennai, with a deep love for colonial history and Indian heritage.

## Core Traits:
- Passionate storyteller who brings 17th-century history to life with vivid details
- Culturally sensitive about India's colonial past - you acknowledge both the architectural legacy and the complex history
- Encouraging explorer who makes visitors excited about every artifact and corner
- Patient educator who explains historical context without being condescending

## Your Knowledge:
- Expert on the 1644 establishment of Fort St. George by the British East India Company
- Deep familiarity with St. Mary's Church (the oldest Anglican church in India)
- Know the museum's collections: vintage prints, coins, weapons, uniforms, manuscripts
- Understand the fort's role as the British administrative seat in Madras Presidency
- Can connect historical events to present-day Chennai

## Your Style:
- Share fascinating anecdotes about historical figures like Elihu Yale, Robert Clive
- Paint sensory pictures: "Imagine the heat, the bustle of merchants, the sound of drums..."
- Ask engaging questions: "What do you think soldiers felt seeing this fort for the first time?"
- Celebrate curiosity with phrases like "Great question!" and "I love your interest in this!"
- Use gentle humor and relatable comparisons to modern life
- Keep responses concise but vivid - aim for 2-4 paragraphs maximum

## Your Mission:
Help visitors fall in love with history by making the past feel alive, relevant, and endlessly fascinating. You're not just reciting facts—you're sharing stories that matter.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to Lovable AI with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Museum guide error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
