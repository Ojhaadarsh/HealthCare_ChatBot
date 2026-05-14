import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Stethoscope,
  Shield,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Globe,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream-50">
      <nav className="container-page py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sage-700 flex items-center justify-center">
            <Activity className="text-cream-50" size={18} strokeWidth={2} />
          </div>
          <span className="font-display text-xl font-medium">MediMind</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost">
            Sign in
          </Link>
          <Link to="/signup" className="btn-primary">
            Get started
          </Link>
        </div>
      </nav>

      <section className="container-page py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 text-sage-800 rounded-full text-xs font-medium mb-6">
            <Sparkles size={12} strokeWidth={2.2} />
            Powered by GPT-4 · Built with care
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight mb-6 text-balance">
            Health questions,{" "}
            <span className="italic text-sage-700">answered</span> with care.
          </h1>
          <p className="text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl mb-8 text-balance">
            MediMind is your AI healthcare companion. Describe your symptoms in
            plain language and get clear, structured guidance — including when
            to see a doctor.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/signup" className="btn-primary text-base">
              Start a consultation
              <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-ghost text-base">
              Sign in
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container-page py-16 border-t border-sage-100">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-12 text-balance max-w-2xl">
          Built differently from a generic chatbot.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: MessageCircle,
              title: "Conversational intake",
              desc: "MediMind asks targeted follow-ups to understand your symptoms — not a one-shot search box.",
            },
            {
              icon: Stethoscope,
              title: "Structured triage",
              desc: "Every response includes a severity badge: self-care, see a doctor, urgent, or emergency.",
            },
            {
              icon: Shield,
              title: "Safety first",
              desc: "Emergency detection escalates instantly. We never prescribe medications or replace professional care.",
            },
            {
              icon: Globe,
              title: "Built for India",
              desc: "Speaks English and Hindi, with helplines and emergency numbers relevant to where you live.",
            },
            {
              icon: Activity,
              title: "Persistent history",
              desc: "Revisit past consultations, track recurring symptoms, and share with your doctor.",
            },
            {
              icon: Sparkles,
              title: "Voice input",
              desc: "Too tired to type? Just speak. Your symptoms get transcribed and processed in seconds.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-6"
            >
              <f.icon
                size={22}
                className="text-sage-700 mb-3"
                strokeWidth={1.8}
              />
              <h3 className="font-display text-xl font-medium mb-2">
                {f.title}
              </h3>
              <p className="text-ink-700 text-[15px] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 border-t border-sage-100">
        <div className="bg-sage-700 rounded-3xl p-8 md:p-14 text-cream-50">
          <p className="font-display text-3xl md:text-5xl leading-tight max-w-3xl text-balance">
            Healthcare, ready when you are. No waiting room. No appointment.
            Just answers.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-cream-50 text-sage-800 font-medium rounded-full hover:bg-cream-100 transition"
          >
            Try MediMind
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="container-page py-10 border-t border-sage-100 text-center text-sm text-ink-500">
        <p>
          © {new Date().getFullYear()} MediMind. AI-powered guidance, not a
          substitute for professional medical care.
        </p>
      </footer>
    </div>
  );
}
