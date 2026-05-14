import { motion } from "framer-motion";
import {
  Stethoscope,
  Home,
  AlertCircle,
  Info,
  CheckCircle2,
} from "lucide-react";
import TriageBadge from "./TriageBadge.jsx";

export default function DiagnosisCard({ diagnosis }) {
  if (!diagnosis) return null;

  const {
    possibleConditions = [],
    recommendedActions = [],
    homeRemedies = [],
    redFlags = [],
    severity,
    disclaimer,
  } = diagnosis;

  const hasAnyDetails =
    possibleConditions.length > 0 ||
    recommendedActions.length > 0 ||
    homeRemedies.length > 0 ||
    redFlags.length > 0;

  if (!hasAnyDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-5 mt-3 space-y-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
            <Stethoscope size={16} className="text-sage-700" />
          </div>
          <h3 className="font-display text-lg font-medium text-ink-900">
            Assessment
          </h3>
        </div>
        <TriageBadge severity={severity} />
      </div>

      {possibleConditions.length > 0 && (
        <Section title="Possible conditions" icon={Info}>
          <ul className="space-y-2">
            {possibleConditions.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 bg-cream-100 rounded-2xl"
              >
                <ConfidenceDot level={c.confidence} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-ink-900">{c.name}</span>
                    <span className="text-xs text-ink-500 capitalize">
                      {c.confidence} confidence
                    </span>
                  </div>
                  <p className="text-sm text-ink-700 mt-0.5">{c.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {recommendedActions.length > 0 && (
        <Section title="Recommended next steps" icon={CheckCircle2}>
          <ul className="space-y-1.5">
            {recommendedActions.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-900">
                <span className="text-sage-600 mt-1">→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {homeRemedies.length > 0 && (
        <Section title="Comfort measures" icon={Home}>
          <ul className="space-y-1.5">
            {homeRemedies.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-900">
                <span className="text-sage-600 mt-1">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {redFlags.length > 0 && (
        <Section title="Seek immediate care if you notice" icon={AlertCircle} alert>
          <ul className="space-y-1.5">
            {redFlags.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                <span className="text-red-600 mt-1">!</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {disclaimer && (
        <p className="text-xs text-ink-500 italic pt-3 border-t border-sage-100 leading-relaxed">
          {disclaimer}
        </p>
      )}
    </motion.div>
  );
}

function Section({ title, icon: Icon, alert, children }) {
  return (
    <div
      className={
        alert
          ? "p-3 bg-red-50 border border-red-200 rounded-2xl"
          : ""
      }
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon
          size={14}
          className={alert ? "text-red-700" : "text-sage-700"}
          strokeWidth={2.2}
        />
        <h4
          className={`text-xs font-medium uppercase tracking-wider ${
            alert ? "text-red-900" : "text-ink-700"
          }`}
        >
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function ConfidenceDot({ level }) {
  const map = {
    high: "bg-sage-600",
    medium: "bg-amber-500",
    low: "bg-ink-500/40",
  };
  return (
    <span
      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
        map[level] || map.low
      }`}
    />
  );
}
