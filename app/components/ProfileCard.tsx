import React from "react";

type ProfileCardProps = {
  imageUrl: string;
  name: string;
  age: number;
  mutuals: number;
  tags: string[];
  vibeLabel: string;
  onGoTonight?: () => void;
};

export default function ProfileCard({ imageUrl, name, age, mutuals, tags, vibeLabel, onGoTonight }: ProfileCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/70 bg-slate-950/5 shadow-2xl shadow-slate-900/10">
      <div
        className="relative h-64 min-h-56 bg-cover bg-center"
        style={{ backgroundImage: "url(" + imageUrl + ")" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/95" />
        <div className="absolute left-6 top-6 rounded-3xl border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white shadow-lg shadow-slate-900/20 backdrop-blur-sm">
          {vibeLabel}
        </div>
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-2 text-xs text-white backdrop-blur-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
          Live
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-5">
          <div className="rounded-4xl border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                {name}, {age}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{mutuals} Mutual Mates</p>
            </div>
            <button className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:bg-fuchsia-500">
              + Mate
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-950/5 px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
            <button className="rounded-3xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              ×
            </button>
              <button
              type="button"
              onClick={onGoTonight}
              className="rounded-3xl bg-linear-to-r from-fuchsia-500 via-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:opacity-95"
            >
              Go Tonight
            </button>
            <button className="rounded-3xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-rose-500 transition hover:border-slate-300 hover:bg-slate-50">
              ♥
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
