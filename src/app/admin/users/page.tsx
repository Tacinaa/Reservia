import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import UserRoleSelect from "./UserRoleSelect";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <div>
        <p style={{ margin: 0, color: "#8a7d72", textTransform: "uppercase" }}>
          Gestion accès
        </p>
        <h2
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Utilisateurs
        </h2>
      </div>

      <div style={{ display: "grid", gap: "0.9rem" }}>
        {users.map((u) => (
          <article
            key={u.id}
            style={{
              padding: "1rem",
              background: "#fff",
              borderRadius: "18px",
              border: "1px solid rgba(0,0,0,0.08)",
              display: "grid",
              gap: "0.7rem",
            }}
          >
            <strong>
              {u.firstName} {u.lastName}
            </strong>
            <p style={{ margin: 0, color: "#5f544c" }}>{u.email}</p>

            <UserRoleSelect id={u.id} current={u.role} />
          </article>
        ))}
      </div>
    </section>
  );
}