import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back");
      navigate("/chat");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-sage-700 text-cream-50 p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center">
            <Activity className="text-sage-800" size={18} strokeWidth={2} />
          </div>
          <span className="font-display text-xl font-medium">MediMind</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-3xl leading-tight max-w-md text-balance">
            "Healthcare guidance, available the moment you need it — without the
            wait."
          </p>
          <p className="text-cream-200 mt-4 text-sm">
            Built with empathy. Backed by AI.
          </p>
        </motion.div>

        <p className="text-cream-200 text-xs">
          © {new Date().getFullYear()} MediMind. Not a substitute for
          professional medical care.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-sage-700 flex items-center justify-center">
              <Activity className="text-cream-50" size={18} strokeWidth={2} />
            </div>
            <span className="font-display text-xl font-medium">MediMind</span>
          </div>

          <h1 className="font-display text-3xl font-medium mb-2">
            Welcome back
          </h1>
          <p className="text-ink-700 mb-8">
            Sign in to continue your consultations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-ink-700 mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-ink-700 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-700">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sage-700 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
