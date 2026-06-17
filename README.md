# Reservia

Reservia est une application web de réservation de voyages réalisée dans le cadre de mon Master 2. Elle permet de consulter des destinations, effectuer des réservations et gérer l’application via un espace d’administration.

## Stack

- Next.js
- Prisma
- PostgreSQL
- NextAuth

## Fonctionnalités

- Consultation des destinations
- Réservation de voyages
- Authentification utilisateur
- Dashboard admin pour gérer les destinations, réservations et utilisateurs

## Lancement

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```