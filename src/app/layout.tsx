import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Reservia",
  description: "Plateforme de réservation de voyages",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          background: "#f6f1eb",
          color: "#1f1a17",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}