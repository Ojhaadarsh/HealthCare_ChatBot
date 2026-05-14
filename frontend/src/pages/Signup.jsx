import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register({
        ...form,
        age: form.age ? Number(form.age) : undefined,
      });
      toast.success("Welcome to MediMind");
      navigate("/chat");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
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
            "Take a moment to understand what your body's telling you — together
            with AI that listens."
          </p>
        </motion.div>

        <p className="text-cream-200 text-xs">
          Free during your studies. Your data stays private.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm py-8"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-sage-700 flex items-center justify-center">
              <Activity className="text-cream-50" size={18} strokeWidth={2} />
            </div>
            <span className="font-display text-xl font-medium">MediMind</span>
          </div>

          <h1 className="font-display text-3xl font-medium mb-2">
            Create account
          </h1>
          <p className="text-ink-700 mb-8">
            Get personalized health guidance, anytime.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm text-ink-700 mb-1.5 block">
                Full name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="Krishna Kumar Singh"
              />
            </div>
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
                placeholder="At least 6 characters"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-ink-700 mb-1.5 block">
                  Age (optional)
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="input-field"
                  min="0"
                  max="120"
                />
              </div>
              <div>
                <label className="text-sm text-ink-700 mb-1.5 block">
                  Gender (optional)
                </label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="input-field"
                >
                  <option value="">—</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sage-700 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
