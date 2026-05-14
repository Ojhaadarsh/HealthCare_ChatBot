import OpenAI from "openai";

const FALLBACK_RESPONSE = {
  reply: "I'm having trouble connecting right now. Please try again in a moment.",
  needsFollowUp: false,
  followUpQuestion: null,
  possibleConditions: [],
  severity: "CONSULT_GP",
  recommendedActions: ["Try again", "Contact a doctor if urgent"],
  homeRemedies: [],
  redFlags: [],
  disclaimer: "MediMind is not a substitute for professional medical advice.",
};

const SYSTEM_PROMPT = `You are MediMind, an empathetic AI healthcare assistant.

RULES:
1. Never replace a doctor. Always include a disclaimer.
2. Never prescribe medications.
3. If user mentions chest pain, stroke, difficulty breathing, severe bleeding, or suicidal thoughts - set severity to EMERGENCY and say call 108.
4. Ask ONE follow-up question at a time.
5. Speak like a caring nurse.

Respond ONLY with a valid JSON object:
{"reply":"message","needsFollowUp":true,"followUpQuestion":"question or null","possibleConditions":[{"name":"name","confidence":"low or medium or high","description":"desc"}],"severity":"SELF_CARE or CONSULT_GP or URGENT or EMERGENCY","recommendedActions":["action"],"homeRemedies":["remedy"],"redFlags":["flag"],"disclaimer":"disclaimer text"}`;

export async function getDiagnosis(userMessage, history = []) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: typeof m.content === "string" ? m.content : m.content?.reply || JSON.stringify(m.content),
      })),
      { role: "user", content: userMessage },
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);

    return {
      reply: result.reply ?? "I need a moment to process that.",
      needsFollowUp: !!result.needsFollowUp,
      followUpQuestion: result.followUpQuestion ?? null,
      possibleConditions: Array.isArray(result.possibleConditions) ? result.possibleConditions : [],
      severity: result.severity || "SELF_CARE",
      recommendedActions: Array.isArray(result.recommendedActions) ? result.recommendedActions : [],
      homeRemedies: Array.isArray(result.homeRemedies) ? result.homeRemedies : [],
      redFlags: Array.isArray(result.redFlags) ? result.redFlags : [],
      disclaimer: result.disclaimer || "MediMind is not a substitute for professional medical advice.",
    };
  } catch (err) {
    console.error("Diagnosis error:", err.message);
    return FALLBACK_RESPONSE;
  }
}