"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Erreur lors de l'inscription");
      return;
    }

    setSuccess("Inscription réussie, redirection vers la connexion...");
    setTimeout(() => {
      router.push("/login");
    }, 1200);
  }

  return (
    <main>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">S'inscrire</button>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </main>
  );
}