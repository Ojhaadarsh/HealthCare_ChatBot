import { useEffect, useState } from "react";
import { Plus, MessageSquare, Trash2, Loader2, X } from "lucide-react";
import { chatApi } from "../services/api.js";
import toast from "react-hot-toast";
import TriageBadge from "./TriageBadge.jsx";

export default function HistorySidebar({
  activeId,
  onSelect,
  onNew,
  refresh,
  open,
  onClose,
}) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await chatApi.getConversations();
      setConversations(data);
    } catch (err) {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this consultation?")) return;
    try {
      await chatApi.deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id));
      if (activeId === id) onNew();
      toast.success("Deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-ink-900/40 z-30"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-cream-100 border-r border-sage-100 flex flex-col z-40 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-sage-100 flex items-center justify-between">
          <button
            onClick={() => {
              onNew();
              onClose?.();
            }}
            className="btn-primary flex-1"
          >
            <Plus size={16} />
            New consultation
          </button>
          <button
            onClick={onClose}
            className="lg:hidden ml-2 w-9 h-9 rounded-full hover:bg-sage-50 flex items-center justify-center"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
          <p className="text-xs text-ink-500 px-2 mb-2 uppercase tracking-wider">
            Past consultations
          </p>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 size={20} className="animate-spin text-sage-700" />
            </div>
          ) : conversations.length === 0 ? (
            <p className="text-sm text-ink-500 px-2 py-4">
              No past consultations yet.
            </p>
          ) : (
            <ul className="space-y-1">
              {conversations.map((c) => (
                <li key={c._id}>
                  <button
                    onClick={() => {
                      onSelect(c._id);
                      onClose?.();
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl group flex items-start gap-2 transition-all ${
                      activeId === c._id
                        ? "bg-sage-700 text-cream-50"
                        : "hover:bg-cream-200 text-ink-900"
                    }`}
                  >
                    <MessageSquare
                      size={14}
                      className="flex-shrink-0 mt-1"
                      strokeWidth={1.8}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate font-medium">{c.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`text-xs ${
                            activeId === c._id
                              ? "text-cream-200"
                              : "text-ink-500"
                          }`}
                        >
                          {new Date(c.updatedAt).toLocaleDateString()}
                        </span>
                        {activeId !== c._id && (
                          <span
                            onClick={(e) => handleDelete(e, c._id)}
                            className="opacity-0 group-hover:opacity-100 text-ink-500 hover:text-red-600 transition cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
