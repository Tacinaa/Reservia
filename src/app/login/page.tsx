"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect");
      return;
    }

    router.push("/compte");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Connexion</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.75rem" }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.75rem" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#0070f3",
            color: "white",
            cursor: "pointer",
          }}
        >
          Se connecter
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}