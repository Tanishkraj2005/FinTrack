import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, TrendingUp, CheckCircle2 } from "lucide-react";

const perks = [
  "Free forever — no credit card required",
  "Secure Firebase authentication",
  "Real-time budget tracking & analytics",
  "Export your data anytime",
];

export default function Register() {
  const { register, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await register(form.email, form.password);
      await updateProfile(userCredential.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase:", "").replace(/\(auth.*\)/, "").trim());
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "10px 12px 10px 36px",
    borderRadius: "11px",
    border: "1.5px solid #e5e7eb",
    background: "white",
    fontSize: "13px",
    color: "#1e1b4b",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      className="h-screen w-full flex flex-col md:flex-row overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: "#f5f3ff" }}
    >

      {/* ── Left Branding Panel (md+) ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-[40%] lg:w-[42%] h-full flex-col justify-center px-8 lg:px-12 py-8 relative overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(145deg, #3730a3 0%, #4F46E5 50%, #7C3AED 100%)" }}
      >
        {/* Deco */}
        <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="absolute -bottom-24 -left-12 w-80 h-80 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <TrendingUp size={22} color="white" />
          </div>
          <span className="text-white text-xl font-bold">FinTrack</span>
        </div>

        <h2 className="text-white text-2xl lg:text-[1.8rem] font-extrabold leading-tight mb-2">
          Start your financial<br />journey today
        </h2>
        <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
          Join thousands of users who've taken control of their money with FinTrack.
        </p>

        {/* Perks */}
        <div className="flex flex-col gap-2.5 mb-5">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                <CheckCircle2 size={12} color="white" />
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>{perk}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <p className="text-xs italic mb-3" style={{ color: "rgba(255,255,255,0.88)", lineHeight: 1.6 }}>
            "FinTrack helped me save ₹15,000 in my first month just by understanding my spending patterns."
          </p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.25)" }}>
              <User size={13} color="white" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Rahul Sharma</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Verified user</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right Form Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 h-full flex flex-col justify-center items-center px-5 sm:px-8 py-6 overflow-y-auto"
        style={{ background: "#FAFAFA", minHeight: 0 }}
      >
        <div className="w-full" style={{ maxWidth: "420px" }}>

          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              <TrendingUp size={18} color="white" />
            </div>
            <span className="text-lg font-bold" style={{ color: "#1e1b4b" }}>FinTrack</span>
          </div>

          <h2 className="font-extrabold mb-1" style={{ fontSize: "clamp(19px,4vw,24px)", color: "#1e1b4b" }}>
            Create your account
          </h2>
          <p className="text-sm mb-3" style={{ color: "#6b7280" }}>It only takes a minute — we promise!</p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-center mb-3 px-3 py-2.5 rounded-xl"
              style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              {[["First Name", "firstName"], ["Last Name", "lastName"]].map(([ph, key]) => (
                <div key={key} style={{ position: "relative" }}>
                  <User size={13} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                  <input
                    type="text"
                    placeholder={ph}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                    style={fieldStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              ))}
            </div>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <Mail size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={fieldStyle}
                onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative" }}>
              <Lock size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 chars)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{ ...fieldStyle, paddingRight: "40px" }}
                onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "11px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 0 }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div style={{ position: "relative" }}>
              <Lock size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                style={fieldStyle}
                onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Submit */}
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
              <UserPlus size={16} />
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span className="text-xs" style={{ color: "#9ca3af" }}>or</span>
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

          <p className="text-center text-sm mt-3" style={{ color: "#6b7280" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:underline" style={{ color: "#4F46E5" }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}