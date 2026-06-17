"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Destination = {
  id: string;
  name: string;
  country: string;
  city: string | null;
  shortDesc: string;
  description: string;
  image: string;
  gallery: string[];
  basePrice: number;
  availableFrom: Date | string | null;
  availableTo: Date | string | null;
};

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.45rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#2f2925",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 46,
  borderRadius: 12,
  border: "1px solid rgba(31,26,23,0.12)",
  padding: "0 0.9rem",
  background: "#fffdfb",
  color: "#1f1a17",
  fontSize: "0.95rem",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 108,
  borderRadius: 12,
  border: "1px solid rgba(31,26,23,0.12)",
  padding: "0.9rem",
  background: "#fffdfb",
  color: "#1f1a17",
  fontSize: "0.95rem",
  resize: "vertical",
};

function toInputDate(value?: string | Date | null) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

function emptyForm() {
  return {
    name: "",
    country: "",
    city: "",
    shortDesc: "",
    description: "",
    image: "",
    gallery: "",
    basePrice: "",
    availableFrom: "",
    availableTo: "",
  };
}

export default function DestinationManager({
  destinations,
}: {
  destinations: Destination[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = useMemo(
    () => (editingId ? "Modifier la destination" : "Ajouter une destination"),
    [editingId]
  );

  function setField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setOpen(true);
    setError("");
  }

  function openEdit(destination: Destination) {
    setEditingId(destination.id);
    setForm({
      name: destination.name,
      country: destination.country,
      city: destination.city || "",
      shortDesc: destination.shortDesc,
      description: destination.description,
      image: destination.image,
      gallery: destination.gallery.join(", "),
      basePrice: String(destination.basePrice),
      availableFrom: toInputDate(destination.availableFrom),
      availableTo: toInputDate(destination.availableTo),
    });
    setOpen(true);
    setError("");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      basePrice: Number(form.basePrice),
      gallery: form.gallery
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      availableFrom: form.availableFrom || null,
      availableTo: form.availableTo || null,
    };

    const response = await fetch(
      editingId
        ? `/api/admin/destinations/${editingId}`
        : "/api/admin/destinations",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.message || "Erreur");
      setLoading(false);
      return;
    }

    setLoading(false);
    setOpen(false);
    router.refresh();
  }

  async function removeDestination(id: string) {
    if (!window.confirm("Supprimer cette destination ?")) return;

    const response = await fetch(`/api/admin/destinations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Suppression impossible");
      return;
    }

    router.refresh();
  }

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={openCreate}
          style={{
            height: 44,
            border: "none",
            borderRadius: 999,
            padding: "0 1rem",
            background: "#1f6b6b",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Ajouter
        </button>

        {open && (
          <button
            onClick={() => setOpen(false)}
            style={{
              height: 44,
              borderRadius: 999,
              padding: "0 1rem",
              border: "1px solid rgba(31,26,23,0.12)",
              background: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Fermer
          </button>
        )}
      </div>

      {open && (
        <form
          onSubmit={submit}
          style={{
            display: "grid",
            gap: 10,
            padding: 18,
            borderRadius: 20,
            background: "#fff",
            border: "1px solid rgba(31,26,23,0.08)",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{title}</h3>

          <label>
            Nom
            <input
              style={inputStyle}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </label>

          <label>
            Pays
            <input
              style={inputStyle}
              value={form.country}
              onChange={(e) => setField("country", e.target.value)}
            />
          </label>

          <label>
            Ville
            <input
              style={inputStyle}
              value={form.city}
              onChange={(e) => setField("city", e.target.value)}
            />
          </label>

          <label>
            Résumé court
            <input
              style={inputStyle}
              value={form.shortDesc}
              onChange={(e) => setField("shortDesc", e.target.value)}
            />
          </label>

          <label>
            Description
            <textarea
              style={textareaStyle}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </label>

          <label>
            Image principale URL
            <input
              style={inputStyle}
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
            />
          </label>

          <label>
            Galerie URL (séparées par virgule)
            <input
              style={inputStyle}
              value={form.gallery}
              onChange={(e) => setField("gallery", e.target.value)}
            />
          </label>

          <label>
            Prix de base
            <input
              type="number"
              style={inputStyle}
              value={form.basePrice}
              onChange={(e) => setField("basePrice", e.target.value)}
            />
          </label>

          <label>
            Disponible à partir de
            <input
              type="date"
              style={inputStyle}
              value={form.availableFrom}
              onChange={(e) => setField("availableFrom", e.target.value)}
            />
          </label>

          <label>
            Disponible jusqu'au
            <input
              type="date"
              style={inputStyle}
              value={form.availableTo}
              onChange={(e) => setField("availableTo", e.target.value)}
            />
          </label>

          {error && <p style={{ margin: 0, color: "#a12c7b" }}>{error}</p>}

          <button
            disabled={loading}
            style={{
              height: 46,
              border: "none",
              borderRadius: 999,
              background: "#1f6b6b",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading
              ? "Enregistrement..."
              : editingId
              ? "Mettre à jour"
              : "Créer"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {destinations.map((d) => (
          <article
            key={d.id}
            style={{
              padding: 16,
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
              display: "grid",
              gap: 8,
            }}
          >
            <strong>{d.name}</strong>
            <p style={{ margin: 0, color: "#5f544c" }}>
              {d.country}
              {d.city ? ` — ${d.city}` : ""}
            </p>
            <p style={{ margin: 0, color: "#7a6d63" }}>{d.shortDesc}</p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => openEdit(d)}
                style={{
                  height: 42,
                  border: "none",
                  borderRadius: 999,
                  padding: "0 1rem",
                  background: "#1f6b6b",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Modifier
              </button>

              <button
                onClick={() => removeDestination(d.id)}
                style={{
                  height: 42,
                  borderRadius: 999,
                  border: "1px solid rgba(31,26,23,0.12)",
                  padding: "0 1rem",
                  background: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}