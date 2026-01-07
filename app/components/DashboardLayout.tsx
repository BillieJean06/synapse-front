"use client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("synapse_user") || "{}");

  return (
    <div>
      <header className="bg-zinc-900 text-white p-4 flex justify-between">
        <h2>NeoJITS</h2>
        <nav className="space-x-6">
          <a href="/dashboard">Dashboard</a>
          {user.role === "admin" && <a href="/admin">Admin</a>}
          <button
            onClick={() => {
              localStorage.clear();
              document.cookie = "synapse_token=;path=/;max-age=0";
              window.location.href = "/login";
            }}
          >
            Sair
          </button>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
