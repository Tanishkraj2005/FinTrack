import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const { login, signInWithGoogle } = useAuth();   // ✅ correct
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");   // goes to protected dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-lg hover:opacity-90"
          >
            Login
          </button>
        </form>
<button
  type="button"
  onClick={async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }}
  className="flex items-center justify-center gap-3 w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-200 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#2b3545] transition shadow-sm"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  <span className="font-medium">
    Continue with Google
  </span>
</button>

        <p className="mt-4 text-center">
          No account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
