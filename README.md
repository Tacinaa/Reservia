# Reservia — Plateforme de Réservation de Voyages

Application Next.js de réservation de voyages permettant d'explorer des destinations, réserver un séjour et gérer ses réservations.

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd reservia

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# puis renseigner les valeurs dans .env

# Générer le client Prisma et appliquer les migrations
npx prisma generate
npx prisma migrate deploy

# Lancer en développement
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable | Description | Exemple |
|---|---|---|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@localhost:5432/reservia` |
| `NEXTAUTH_SECRET` | Clé secrète pour NextAuth.js (min. 32 chars) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL publique de l'application | `http://localhost:3000` |

## Choix techniques

### Stack

| Technologie | Rôle |
|---|---|
| **Next.js 15** (App Router) | Framework principal — SSR, SSG, ISR, API Routes |
| **PostgreSQL** | Base de données relationnelle |
| **Prisma** | ORM — schéma typé, migrations, client généré |
| **NextAuth.js** | Authentification — stratégie JWT, sessions sécurisées |
| **bcryptjs** | Hachage des mots de passe |
| **next/image** | Optimisation automatique des images (WebP, lazy loading, srcset) |

### Justification SSR / SSG / ISR

| Page | Stratégie | Justification |
|---|---|---|
| `/` (accueil) | **SSR** | Le contenu est personnalisé selon la session (message de bienvenue, boutons adaptatifs). Impossible à mettre en cache statiquement. |
| `/destinations` | **ISR** (`revalidate = 60`) | Les destinations changent rarement. ISR génère une page statique revalidée toutes les 60 secondes : performances maximales sans surcharger la base de données à chaque visite. |
| `/destinations/[id]` | **ISR** (`revalidate = 60`) | Même logique que la liste. Le contenu d'une destination évolue peu ; ISR offre le meilleur compromis fraîcheur/performance. |
| `/reservations` | **SSR** | Données privées et temps réel — chaque utilisateur doit voir ses propres réservations à jour immédiatement après une action. |
| `/compte` | **SSR** | Données utilisateur privées, toujours fraîches. |
| `/admin/*` | **SSR** | Données critiques de gestion, jamais mises en cache. |

### Architecture des routes API

```
POST   /api/register                    Inscription
POST   /api/auth/[...nextauth]          NextAuth (login, logout, session)

POST   /api/destinations                Créer une destination (admin)
DELETE /api/destinations/[id]           Supprimer une destination (admin)

POST   /api/reservations                Créer une réservation (utilisateur connecté)
DELETE /api/reservations/[id]           Annuler une réservation

POST   /api/admin/destinations          Créer (interface admin)
PUT    /api/admin/destinations/[id]     Modifier (interface admin)
DELETE /api/admin/destinations/[id]     Supprimer (interface admin)
DELETE /api/admin/reservations/[id]     Annuler (interface admin)
DELETE /api/admin/users/[id]            Supprimer un utilisateur
```

## Schéma de la base de données

```
User
├── id           String   @id @default(cuid())
├── firstName    String
├── lastName     String
├── email        String   @unique
├── password     String   (hash bcrypt)
├── role         Role     USER | ADMIN
├── reservations Reservation[]
├── createdAt    DateTime
└── updatedAt    DateTime

Destination
├── id            String   @id @default(cuid())
├── name          String
├── country       String
├── city          String?
├── shortDesc     String
├── description   String
├── image         String   (URL image principale)
├── gallery       String[] (URLs images supplémentaires)
├── basePrice     Float
├── availableFrom DateTime?
├── availableTo   DateTime?
├── reservations  Reservation[]
├── createdAt     DateTime
└── updatedAt     DateTime

Reservation
├── id            String      @id @default(cuid())
├── userId        String      → User (cascade delete)
├── destinationId String      → Destination (cascade delete)
├── travelDate    DateTime
├── persons       Int
├── totalPrice    Float       (basePrice × persons)
├── status        String      CONFIRMED | CANCELLED
├── createdAt     DateTime
└── updatedAt     DateTime
```

## Structure du projet

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/          Page de connexion
│   │   └── register/       Page d'inscription
│   ├── admin/
│   │   ├── destinations/   CRUD destinations
│   │   ├── reservations/   Vue de toutes les réservations
│   │   ├── users/          Gestion des utilisateurs
│   │   └── page.tsx        Dashboard admin
│   ├── api/                Routes API Next.js
│   ├── compte/             Espace utilisateur (infos + réservations)
│   ├── destinations/       Liste (ISR + filtres) et détail
│   ├── reservations/       Mes réservations
│   └── page.tsx            Homepage (SSR)
├── components/             Composants réutilisables
│   ├── Navbar.tsx
│   ├── ReservationForm.tsx
│   ├── CancelReservationButton.tsx
│   └── ...
├── lib/
│   ├── prisma.ts           Instance Prisma singleton
│   ├── auth.ts             Configuration NextAuth
│   └── admin.ts            Helper requireAdmin()
└── middleware.ts           Protection des routes /admin
```

## Fonctionnalités

- **Exploration** : liste des destinations avec recherche par nom/pays et filtre par prix
- **Réservation** : choix de la date et du nombre de voyageurs, calcul automatique du prix total, validation des disponibilités
- **Authentification** : inscription, connexion, déconnexion via NextAuth + JWT
- **Espace utilisateur** : consultation et annulation de ses réservations
- **Interface admin** : CRUD complet sur les destinations, vue de toutes les réservations, gestion des utilisateurs
- **Optimisation** : images optimisées avec `next/image` (WebP, lazy loading, responsive srcset)
