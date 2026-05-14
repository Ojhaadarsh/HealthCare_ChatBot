import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import useVoiceInput from "../hooks/useVoiceInput.js";

export default function SymptomInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { listening, supported, start, stop } = useVoiceInput((transcript) => {
    setText((prev) => (prev ? prev + " " + transcript : transcript));
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [text]);

  const handleSubmit = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="card p-3 flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Describe how you're feeling…"
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none bg-transparent px-3 py-2 focus:outline-none placeholder:text-ink-500 text-[15px] leading-relaxed scrollbar-thin"
      />

      {supported && (
        <button
          type="button"
          onClick={listening ? stop : start}
          disabled={disabled}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            listening
              ? "bg-red-500 text-white animate-pulse-soft"
              : "bg-sage-50 text-sage-700 hover:bg-sage-100"
          }`}
          aria-label={listening ? "Stop recording" : "Start voice input"}
        >
          {listening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      )}

      <button
        onClick={handleSubmit}
        disabled={!text.trim() || disabled}
        className="w-10 h-10 rounded-full bg-sage-700 text-cream-50 flex items-center justify-center hover:bg-sage-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
        aria-label="Send"
      >
        {disabled ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
      </button>
    </div>
  );
}
