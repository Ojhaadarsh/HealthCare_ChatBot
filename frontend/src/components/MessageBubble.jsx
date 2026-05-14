import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import DiagnosisCard from "./DiagnosisCard.jsx";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-sage-700 text-cream-50"
            : "bg-cream-100 text-sage-700 border border-sage-100"
        }`}
      >
        {isUser ? <User size={16} /> : <Sparkles size={16} />}
      </div>

      <div
        className={`flex-1 max-w-[85%] ${
          isUser ? "items-end flex flex-col" : ""
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-sage-700 text-cream-50 rounded-tr-md"
              : "bg-white border border-sage-100 text-ink-900 rounded-tl-md"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
            {message.content}
          </p>
        </div>

        {!isUser && message.diagnosis && (
          <div className="w-full">
            <DiagnosisCard diagnosis={message.diagnosis} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
