import React from "react";

type InfoStep = {
  label: string;
  description: string;
  number: number;
  imageUrl: string;
};

type InfoPanelProps = {
  title: string;
  subtitle: string;
  steps: InfoStep[];
  perks: string[];
  onVerify: () => void;
};

export default function InfoPanel({
  title,
  subtitle,
  steps,
  perks,
  onVerify,
}: InfoPanelProps) {
  return (
    <aside className="order-3 flex w-full flex-col rounded-[28px] border border-white/80 bg-white/82 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-6 lg:order-none lg:min-h-[calc(100vh-3rem)] lg:rounded-[40px]">
      <div className="flex flex-col items-center gap-5 rounded-[28px] border border-slate-200/80 bg-white px-5 py-8 text-center shadow-sm shadow-slate-900/5 sm:px-8">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-slate-900/10">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
          <span className="absolute -right-1 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 px-2 py-1 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20">
            ✓
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold leading-tight text-slate-950">{title}</h3>
          <p className="mt-3 text-base leading-6 text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] bg-slate-950/5 p-4 sm:p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
          How It Works
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex min-w-0 gap-4 rounded-[26px] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-3xl">
                <img src={step.imageUrl} alt={step.label} className="h-full w-full object-cover" />
                <span className="absolute right-0 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-600 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/20">
                  {step.number}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-snug text-slate-900">{step.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
        {perks.map((perk) => (
          <div
            key={perk}
            className="flex min-w-0 items-center gap-3 rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm shadow-slate-900/5"
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              ✓
            </span>
            <span className="min-w-0">{perk}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onVerify}
        className="mt-6 rounded-full bg-linear-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-fuchsia-500/20 transition hover:opacity-95 lg:mt-auto"
      >
        Get Verified
      </button>
      <button className="mt-4 text-sm font-medium text-slate-500 transition hover:text-slate-700">
        Maybe later
      </button>
    </aside>
  );
}
