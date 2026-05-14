import { motion } from "framer-motion";
import { Activity, Thermometer, Wind, Heart } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: Thermometer,
    title: "I've had a fever for 2 days",
    prompt:
      "I've had a fever for the past 2 days, around 101°F. I also feel tired and my body aches.",
  },
  {
    icon: Wind,
    title: "Persistent cough",
    prompt:
      "I've had a persistent cough for about a week. It's mostly dry but sometimes I bring up clear mucus.",
  },
  {
    icon: Activity,
    title: "Frequent headaches",
    prompt:
      "I've been getting headaches almost every day this week, mostly in the afternoon. They feel like pressure around my forehead.",
  },
  {
    icon: Heart,
    title: "Anxiety symptoms",
    prompt:
      "I've been feeling anxious lately with a racing heart, sometimes even when I'm just sitting still. I'd like to understand what might be going on.",
  },
];

export default function WelcomeScreen({ user, onSelectPrompt }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage-100 mb-5">
          <Activity className="text-sage-700" size={26} strokeWidth={1.8} />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-ink-900 mb-3 text-balance">
          Hello, {user?.name?.split(" ")[0] || "there"}.
        </h1>
        <p className="text-ink-700 text-lg max-w-md mx-auto leading-relaxed text-balance">
          What's bothering you today? Describe your symptoms in your own words —
          I'll help you make sense of them.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            onClick={() => onSelectPrompt(s.prompt)}
            className="card p-4 text-left hover:border-sage-300 hover:shadow-md transition-all group"
          >
            <s.icon
              size={18}
              className="text-sage-600 mb-2 group-hover:text-sage-700"
              strokeWidth={1.8}
            />
            <p className="font-medium text-ink-900 text-sm">{s.title}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
