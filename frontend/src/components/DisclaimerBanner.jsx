import { Info } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
      <Info size={14} className="flex-shrink-0 mt-0.5" strokeWidth={2.2} />
      <p className="leading-relaxed">
        MediMind provides general health information and is not a substitute for
        professional medical advice. In emergencies, call{" "}
        <span className="font-semibold">108</span> (India) or your local
        emergency number.
      </p>
    </div>
  );
}
