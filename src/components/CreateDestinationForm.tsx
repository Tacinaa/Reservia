"use client";

import { useState } from "react";

export function CreateDestinationForm() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const galleryArray = gallery
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const res = await fetch("/api/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        country,
        city,
        shortDesc,
        description,
        image,
        gallery: galleryArray,
        basePrice,
        availableFrom,
        availableTo,
      }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = "/admin/destinations";
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Impossible de créer la destination.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="country">Pays</label>
        <input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="city">Ville</label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="shortDesc">Description courte</label>
        <input
          id="shortDesc"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description complète</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="image">Image principale</label>
        <input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          required
        />
      </div>

      <div>
        <label htmlFor="gallery">Galerie (URLs séparées par des virgules)</label>
        <input
          id="gallery"
          value={gallery}
          onChange={(e) => setGallery(e.target.value)}
          placeholder="https://img1..., https://img2..."
        />
      </div>

      <div>
        <label htmlFor="basePrice">Prix de base</label>
        <input
          id="basePrice"
          type="number"
          step="0.01"
          min="0"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="availableFrom">Disponible à partir du</label>
        <input
          id="availableFrom"
          type="date"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="availableTo">Disponible jusqu’au</label>
        <input
          id="availableTo"
          type="date"
          value={availableTo}
          onChange={(e) => setAvailableTo(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Création..." : "Créer la destination"}
      </button>
    </form>
  );
}