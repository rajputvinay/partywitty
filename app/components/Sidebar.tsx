import React from "react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  items: NavItem[];
};

const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/95 text-slate-900 shadow-sm ring-1 ring-slate-200">
    {children}
  </span>
);

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="order-2 flex w-full flex-col rounded-[28px] border border-white/80 bg-white/82 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-6 lg:order-none lg:min-h-[calc(100vh-3rem)] lg:rounded-[40px]">
      <div className="mb-5 flex items-center gap-3 lg:mb-12">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-700 text-white shadow-lg shadow-violet-500/25">
          <span className="text-lg font-black">PW</span>
        </div>
        <div>
          <p className="text-base font-semibold text-slate-800">partywitty</p>
          <p className="text-sm text-slate-500">Feed bids</p>
        </div>
      </div>

      <nav className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:flex-1 lg:flex-col lg:gap-6 lg:px-5">
        {items.map((item) => (
          <button
            key={item.label}
            className="group flex min-w-0 items-center gap-3 rounded-3xl px-2 py-2 text-left transition hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 lg:gap-5 lg:px-0"
          >
            <NavIcon>{item.icon}</NavIcon>
            <span className="min-w-0 truncate text-sm font-semibold text-slate-700 group-hover:text-slate-900 lg:text-base">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-5 rounded-3xl bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/20 lg:mt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">More</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-3xl bg-linear-to-br from-slate-700 via-slate-900 to-slate-800" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Corporate Employee Offer</p>
            <p className="truncate text-xs text-slate-400">1 Month For Rs.1</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
