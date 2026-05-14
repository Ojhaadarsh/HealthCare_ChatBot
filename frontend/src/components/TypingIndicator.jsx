import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-cream-100 text-sage-700 border border-sage-100">
        <Sparkles size={16} />
      </div>
      <div className="bg-white border border-sage-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-sage-500 rounded-full animate-typing" />
        <span
          className="w-1.5 h-1.5 bg-sage-500 rounded-full animate-typing"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="w-1.5 h-1.5 bg-sage-500 rounded-full animate-typing"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}
