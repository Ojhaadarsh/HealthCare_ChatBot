const EMERGENCY_KEYWORDS = [
  "chest pain",
  "can't breathe",
  "cannot breathe",
  "difficulty breathing",
  "shortness of breath",
  "stroke",
  "face drooping",
  "slurred speech",
  "unconscious",
  "passed out",
  "fainted",
  "severe bleeding",
  "bleeding heavily",
  "suicidal",
  "kill myself",
  "end my life",
  "self harm",
  "self-harm",
  "anaphylaxis",
  "throat swelling",
  "severe allergic",
  "heart attack",
  "seizure",
  "convulsion",
];

const MENTAL_HEALTH_KEYWORDS = [
  "suicidal",
  "kill myself",
  "end my life",
  "self harm",
  "self-harm",
  "want to die",
  "no reason to live",
];

export function detectEmergency(text) {
  if (!text) return { isEmergency: false, isMentalHealth: false };
  const lower = text.toLowerCase();

  const isEmergency = EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
  const isMentalHealth = MENTAL_HEALTH_KEYWORDS.some((kw) => lower.includes(kw));

  return { isEmergency, isMentalHealth };
}

export function getEmergencyResponse(isMentalHealth) {
  if (isMentalHealth) {
    return {
      reply:
        "I'm really concerned about what you're sharing, and I want you to know your life matters. Please reach out for support right now — you don't have to go through this alone.",
      needsFollowUp: false,
      followUpQuestion: null,
      possibleConditions: [],
      severity: "EMERGENCY",
      recommendedActions: [
        "Call iCall India: 9152987821 (free counselling)",
        "Call Vandrevala Foundation: 1860-2662-345 (24/7)",
        "If in immediate danger, call 112 or go to the nearest hospital",
        "Reach out to someone you trust right now",
      ],
      homeRemedies: [],
      redFlags: [
        "Thoughts of harming yourself or others",
        "Plans to act on those thoughts",
      ],
      disclaimer:
        "If you are in immediate danger, please call emergency services (112 in India) or go to the nearest emergency room.",
    };
  }

  return {
    reply:
      "These symptoms can be serious and need immediate medical attention. Please call emergency services right now — don't wait.",
    needsFollowUp: false,
    followUpQuestion: null,
    possibleConditions: [],
    severity: "EMERGENCY",
    recommendedActions: [
      "Call emergency services: 108 (India) / 911 (US) / 999 (UK)",
      "If possible, have someone stay with you",
      "Do not drive yourself — call an ambulance or have someone drive you",
    ],
    homeRemedies: [],
    redFlags: [
      "Worsening pain or symptoms",
      "Loss of consciousness",
      "Unable to speak clearly",
    ],
    disclaimer:
      "This is an AI assistant. In an emergency, always call professional emergency services immediately.",
  };
}
