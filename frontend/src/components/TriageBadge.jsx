import { AlertTriangle, ShieldCheck, Activity, Siren } from "lucide-react";

const CONFIG = {
  SELF_CARE: {
    label: "Self-care",
    icon: ShieldCheck,
    bg: "bg-sage-50",
    text: "text-sage-800",
    border: "border-sage-200",
    ring: "ring-sage-200",
  },
  CONSULT_GP: {
    label: "Consult a doctor",
    icon: Activity,
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
    ring: "ring-amber-200",
  },
  URGENT: {
    label: "Urgent — see today",
    icon: AlertTriangle,
    bg: "bg-orange-50",
    text: "text-orange-900",
    border: "border-orange-200",
    ring: "ring-orange-200",
  },
  EMERGENCY: {
    label: "Emergency — call now",
    icon: Siren,
    bg: "bg-red-50",
    text: "text-red-900",
    border: "border-red-300",
    ring: "ring-red-300",
  },
};

export default function TriageBadge({ severity }) {
  const config = CONFIG[severity] || CONFIG.SELF_CARE;
  const Icon = config.icon;
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} text-xs font-medium`}
    >
      <Icon size={14} strokeWidth={2.2} />
      <span>{config.label}</span>
    </div>
  );
}
