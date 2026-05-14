import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, Activity } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { chatApi } from "../services/api.js";
import HistorySidebar from "../components/HistorySidebar.jsx";
import MessageBubble from "../components/MessageBubble.jsx";
import SymptomInput from "../components/SymptomInput.jsx";
import TypingIndicator from "../components/TypingIndicator.jsx";
import DisclaimerBanner from "../components/DisclaimerBanner.jsx";
import WelcomeScreen from "../components/WelcomeScreen.jsx";

export default function Chat() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleNew = () => {
    setConversationId(null);
    setMessages([]);
  };

  const handleSelect = async (id) => {
    try {
      const { data } = await chatApi.getConversation(id);
      setConversationId(data._id);
      setMessages(data.messages);
    } catch (err) {
      toast.error("Failed to load consultation");
    }
  };

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const { data } = await chatApi.sendMessage(text, conversationId);
      const assistantMsg = {
        role: "assistant",
        content: data.diagnosis.reply,
        diagnosis: data.diagnosis,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      if (!conversationId) {
        setConversationId(data.conversationId);
        setHistoryRefresh((v) => v + 1);
      }
    } catch (err) {
      toast.error("Couldn't reach the assistant. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-cream-50">
      <HistorySidebar
        activeId={conversationId}
        onSelect={handleSelect}
        onNew={handleNew}
        refresh={historyRefresh}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-sage-100 bg-cream-50/80 backdrop-blur sticky top-0 z-20">
          <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-9 h-9 rounded-full hover:bg-sage-50 flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sage-700 flex items-center justify-center">
                  <Activity
                    className="text-cream-50"
                    size={16}
                    strokeWidth={2}
                  />
                </div>
                <span className="font-display text-lg font-medium">
                  MediMind
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink-700 hidden sm:inline">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="btn-ghost text-sm"
                aria-label="Logout"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {messages.length === 0 ? (
            <WelcomeScreen user={user} onSelectPrompt={handleSend} />
          ) : (
            <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 space-y-6">
              <DisclaimerBanner />
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}
              {sending && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        <footer className="border-t border-sage-100 bg-cream-50">
          <div className="max-w-3xl mx-auto p-4">
            <SymptomInput onSend={handleSend} disabled={sending} />
            <p className="text-xs text-ink-500 text-center mt-2">
              Press Enter to send · Shift + Enter for new line
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
