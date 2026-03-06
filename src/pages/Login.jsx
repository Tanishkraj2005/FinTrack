import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, TrendingUp, ShieldCheck, BarChart2, Zap } from "lucide-react";

const features = [
  { icon: BarChart2, title: "Smart Analytics", desc: "Beautiful charts for your spending" },
  { icon: ShieldCheck, title: "Secure & Private", desc: "Your data is always encrypted" },
  { icon: Zap, title: "Real-time Tracking", desc: "Instant transaction updates" },
];

export default function Login() {
  const { login, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden" style={{ fontFamily: "'Inter', sans-serif", background: "#f5f3ff" }}>

      {/* ── Left Branding Panel (hidden on mobile, shown md+) ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-[42%] lg:w-[45%] h-full flex-col justify-center px-10 lg:px-14 py-8 relative overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(145deg, #3730a3 0%, #4F46E5 50%, #7C3AED 100%)" }}
      >
        {/* Deco circles */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <TrendingUp size={22} color="white" />
          </div>
          <span className="text-white text-xl font-bold">FinTrack</span>
        </div>

        <h2 className="text-white text-2xl lg:text-3xl font-extrabold leading-tight mb-2">
          Take control of<br />your finances
        </h2>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
          Track expenses, set budgets, and achieve your financial goals — all in one place.
        </p>

        {/* Feature cards */}
        <div className="flex flex-col gap-2.5 mb-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <f.icon size={16} color="white" />
              </div>
              <div>
                <p className="text-white font-semibold text-xs">{f.title}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-8 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {[["10k+", "Users"], ["₹2M+", "Tracked"], ["99%", "Uptime"]].map(([num, lbl]) => (
            <div key={lbl}>
              <p className="text-white font-extrabold text-lg">{num}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{lbl}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Right Form Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 h-full flex flex-col justify-center items-center px-5 sm:px-8 py-6 overflow-y-auto"
        style={{ background: "#FAFAFA", minHeight: 0 }}
      >
        <div className="w-full" style={{ maxWidth: "400px" }}>

          {/* Mobile top logo */}
          <div className="flex md:hidden items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              <TrendingUp size={18} color="white" />
            </div>
            <span className="text-lg font-bold" style={{ color: "#1e1b4b" }}>FinTrack</span>
          </div>

          {/* Heading */}
          <h2 className="font-extrabold mb-1" style={{ fontSize: "clamp(20px,4vw,26px)", color: "#1e1b4b" }}>
            Welcome back 👋
          </h2>
          <p className="text-sm mb-4" style={{ color: "#6b7280" }}>Sign in to your account to continue</p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-center mb-4 px-3 py-2.5 rounded-xl"
              style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#374151" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm rounded-xl outline-none transition-all"
                  style={{ padding: "10px 13px 10px 38px", border: "1.5px solid #e5e7eb", background: "white", color: "#1e1b4b", boxSizing: "border-box" }}
                  onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#374151" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm rounded-xl outline-none transition-all"
                  style={{ padding: "10px 42px 10px 38px", border: "1.5px solid #e5e7eb", background: "white", color: "#1e1b4b", boxSizing: "border-box" }}
                  onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 0 }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-bold rounded-xl text-white text-sm py-3"
              style={{
                background: loading ? "#818cf8" : "linear-gradient(135deg,#4F46E5,#7C3AED)",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
                marginTop: "4px",
              }}
            >
              <LogIn size={16} />
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span className="text-xs" style={{ color: "#9ca3af" }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          </div>

          {/* Google */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={async () => {
              try {
                await signInWithGoogle();
                navigate("/");
              } catch (err) {
                setError(err.message);
              }
            }}
            className="w-full flex items-center justify-center gap-2.5 font-semibold text-sm py-3 rounded-xl transition-all"
            style={{ border: "1.5px solid #e5e7eb", background: "white", color: "#374151", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: "18px", height: "18px" }} />
            Continue with Google
          </motion.button>

          <p className="text-center text-sm mt-4" style={{ color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link to="/register" className="font-bold hover:underline" style={{ color: "#4F46E5" }}>
              Create Free Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}