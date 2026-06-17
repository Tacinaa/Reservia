"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const callbackUrl = searchParams.get("callbackUrl") || "/reservations";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    router.push(result?.url || "/reservations");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ display: "grid", gap: "0.45rem" }}>
        <label
          htmlFor="email"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#3f362f",
          }}
        >
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            height: "54px",
            borderRadius: "16px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: "#1f1a17",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "0.45rem" }}>
        <label
          htmlFor="password"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#3f362f",
          }}
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            height: "54px",
            borderRadius: "16px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: "#1f1a17",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      {error ? (
        <p
          style={{
            margin: 0,
            color: "#a12c7b",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "0.4rem",
          height: "56px",
          border: "none",
          borderRadius: "999px",
          background: "#1f6b6b",
          color: "#ffffff",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 14px 28px rgba(31,107,107,0.18)",
          opacity: loading ? 0.8 : 1,
        }}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}