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

export default function ProfileCard({
  imageUrl,
  name,
  age,
  mutuals,
  tags,
  vibeLabel,
  onGoTonight,
}: ProfileCardProps) {
  return (
    <section className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 shadow-2xl shadow-slate-900/14 sm:min-h-[390px] sm:rounded-[40px] lg:min-h-[322px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{ backgroundImage: "url(" + imageUrl + ")" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/5 via-slate-950/20 to-slate-950/95" />
      <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/12 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white shadow-lg shadow-slate-900/20 backdrop-blur-sm sm:left-7 sm:top-7">
        {vibeLabel}
      </div>
      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-slate-900/72 px-3 py-2 text-xs text-white backdrop-blur-sm sm:right-7 sm:top-7">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
        Live
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7 lg:p-8">
        <div className="rounded-[28px] border border-white/40 bg-white/96 p-5 shadow-2xl shadow-slate-900/12 backdrop-blur-xl sm:rounded-[36px] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-3xl font-semibold leading-tight text-slate-950">
                {name}, {age}
              </h2>
              <p className="mt-1 text-base text-slate-500">{mutuals} Mutual Mates</p>
            </div>
            <button className="w-full rounded-full bg-fuchsia-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:bg-fuchsia-500 sm:w-auto">
              + Mate
            </button>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-950/6 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button className="rounded-full border border-slate-200/90 bg-white px-4 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              x
            </button>
            <button
              type="button"
              onClick={onGoTonight}
              className="rounded-full bg-linear-to-r from-fuchsia-500 via-violet-600 to-blue-600 px-4 py-4 text-base font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition hover:opacity-95"
            >
              Go Tonight
            </button>
            <button className="rounded-full border border-slate-200/90 bg-white px-4 py-4 text-base font-semibold text-rose-500 transition hover:border-slate-300 hover:bg-slate-50">
              ♥
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
