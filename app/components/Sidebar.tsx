import React from "react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  items: NavItem[];
};

const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-slate-900 shadow-sm ring-1 ring-slate-200">{children}</span>
);

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="flex h-full min-h-190 w-full max-w-65 flex-col rounded-4xl border border-white/80 bg-white/80 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:max-w-70">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-700 text-white shadow-violet-500/20 shadow-lg">
          <span className="text-lg font-black">PW</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">partywitty</p>
          <p className="text-xs text-slate-500">Feed bids</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-4">
        {items.map((item) => (
          <button
            key={item.label}
            className="group flex items-center gap-4 rounded-3xl px-4 py-3 text-left transition hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <NavIcon>{item.icon}</NavIcon>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/20">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">More</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-3xl bg-linear-to-br from-slate-700 via-slate-900 to-slate-800" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Corporate Employee Offer</p>
            <p className="truncate text-xs text-slate-400">1 Month For ₹1</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
