import React, { useState } from "react";

type EventCard = {
  title: string;
  location: string;
  subtitle: string;
  badge: string;
  time: string;
  note: string;
  discount: string;
  rating: string;
  imageUrl: string;
};

type InviteModalProps = {
  open: boolean;
  step: 1 | 2;
  onClose: () => void;
  onConfirm: () => void;
};

const eventCards: EventCard[] = [
  {
    title: "F-Bar",
    location: "Nocturne Rooftop",
    subtitle: "Sector 38, Entertainment City - 13 km",
    badge: "Happening Now",
    time: "Friday - 10:00 PM onwards",
    note: "Zoya has been here twice",
    discount: "36% off F&B",
    rating: "4.1",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Prism",
    location: "Skyline Social",
    subtitle: "Sector 29, Central Plaza - 8 km",
    badge: "Vibe Match",
    time: "Friday - 9:30 PM onwards",
    note: "Popular with your circle",
    discount: "25% off drinks",
    rating: "4.4",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "After Dark",
    location: "Luxe Lounge",
    subtitle: "Golf Course Road - 11 km",
    badge: "Few Tables",
    time: "Friday - 10:30 PM onwards",
    note: "Two mutuals going",
    discount: "1+1 cocktails",
    rating: "4.3",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
  },
];

const drinkOptions = [
  { name: "Dry Martini", price: "Rs.999", label: "Most likely to get accepted" },
  { name: "Mai Tai", price: "Rs.899", label: "Most Popular" },
  { name: "Cosmopolitan", price: "Rs.199", label: "Easy Choose" },
  { name: "Wine Glass", price: "Rs.2199", label: "Make An Impression" },
];

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm shadow-slate-900/5 transition hover:bg-slate-100"
    aria-label="Close"
  >
    <span className="text-xl leading-none">x</span>
  </button>
);

export default function InviteModal({
  open,
  step,
  onClose,
  onConfirm,
}: InviteModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setSelectedEvent(null);
    setSelectedDrink(null);
    setShowSuccess(false);
    onClose();
  };

  const selectedDrinkPrice = selectedDrink
    ? drinkOptions.find((drink) => drink.name === selectedDrink)?.price
    : "Rs.0";
  const ticketsPrice = 59;
  const platformFee = 5.9;
  const drinkAmount = Number(selectedDrinkPrice?.replace(/[^0-9]/g, "") ?? 0);
  const totalPrice = ticketsPrice + platformFee + (selectedDrink ? drinkAmount : 0);

  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 px-3 py-6 backdrop-blur-sm sm:px-4">
        <div className="w-full max-w-5xl rounded-[30px] border border-white/20 bg-slate-50 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/40 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-sm">
                Go Tonight
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">You chose her</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                You are about to send her a{" "}
                <span className="font-semibold text-fuchsia-600">special invite</span>
              </p>
            </div>
            <CloseButton onClick={handleClose} />
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] bg-slate-950 shadow-xl shadow-slate-950/20">
            <div
              className="relative h-72 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                Casual Fun
              </div>
            </div>
            <div className="bg-slate-950/95 px-5 pb-6 pt-5 text-white sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Zoe Miller, 22</h3>
                  <p className="mt-1 text-sm text-slate-300">4 Mutual Mates</p>
                </div>
                <button className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  + Mate
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            className="mt-8 w-full rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-fuchsia-500/20 transition hover:opacity-95"
          >
            Make Your Move
          </button>
          <p className="mt-3 text-center text-sm text-slate-500">
            Add a drink to introduce yourself
          </p>
        </div>
      </div>
    );
  }

  if (showSuccess && selectedEvent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 px-3 py-6 backdrop-blur-sm sm:px-4">
        <div className="w-full max-w-2xl rounded-[30px] border border-white/20 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-600">
                PartyWitty
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Invite Sent</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your drink invite to {selectedEvent.title} is on its way. You only pay if she accepts.
              </p>
            </div>
            <CloseButton onClick={handleClose} />
          </div>

          <div className="mt-8 rounded-[28px] bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/20 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-fuchsia-600 text-2xl font-semibold text-white">
                ✓
              </div>
              <div>
                <p className="text-sm text-slate-300">Confirmed drink invite</p>
                <p className="mt-1 text-xl font-semibold text-white">{selectedDrink}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-3">
                <span>Club</span>
                <span>{selectedEvent.title}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Date</span>
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Bill total</span>
                <span>{selectedDrinkPrice}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="mt-8 w-full rounded-3xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:opacity-95"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (selectedEvent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 px-3 py-6 backdrop-blur-sm sm:px-4">
        <div className="w-full max-w-5xl rounded-[30px] border border-white/20 bg-slate-50 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/40 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Order Summary
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">{selectedEvent.title}</h2>
              <p className="mt-2 text-sm text-slate-500">
                {selectedEvent.location} - {selectedEvent.subtitle}
              </p>
            </div>
            <CloseButton onClick={handleClose} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6">
              <div className="space-y-3 rounded-[26px] bg-slate-950 p-5 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Tickets Price</p>
                <h3 className="text-xl font-semibold">{selectedDrink || "Select a drink"}</h3>
                <p className="text-sm text-slate-400">
                  You only pay for the drink if they accept your invite.
                </p>
              </div>

              <div className="grid gap-4">
                {drinkOptions.map((drink) => {
                  const isSelected = selectedDrink === drink.name;
                  return (
                    <button
                      key={drink.name}
                      type="button"
                      onClick={() => setSelectedDrink(drink.name)}
                      className={`rounded-[26px] border px-5 py-4 text-left transition ${
                        isSelected
                          ? "border-fuchsia-500 bg-fuchsia-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-lg font-semibold text-slate-950">{drink.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{drink.label}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                          {drink.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">Bill Details</p>
                <span className="text-sm text-slate-500">Total</span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <span>Tickets Amount</span>
                  <span>Rs.59</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Platform & Other Charges</span>
                  <span>Rs.5.90</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3 font-semibold text-slate-950">
                  <span>Grand Total</span>
                  <span>Rs.{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                />
                <span>
                  I agree to the <span className="text-fuchsia-600">Terms of Service</span> and{" "}
                  <span className="text-fuchsia-600">Privacy Policy</span>.
                </span>
              </label>
              <button
                type="button"
                disabled={!selectedDrink}
                onClick={() => setShowSuccess(true)}
                className={`mt-6 w-full rounded-full px-5 py-4 text-sm font-semibold text-white shadow-xl transition ${
                  selectedDrink
                    ? "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 shadow-fuchsia-500/20 hover:opacity-95"
                    : "cursor-not-allowed bg-slate-300 text-slate-500"
                }`}
              >
                Make The Move Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 px-3 py-6 backdrop-blur-sm sm:px-4">
      <div className="w-full max-w-5xl rounded-[30px] border border-white/20 bg-slate-50 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/40 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Event listing
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Tonight near you</h2>
          </div>
          <CloseButton onClick={handleClose} />
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80"
                alt="Zoe Miller"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pick a plan you would both enjoy</p>
              <p className="text-base font-semibold text-slate-950">Zoe Miller, 22</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-100 px-4 py-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventCards.map((event) => (
            <div
              key={event.title}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-950/10"
            >
              <div
                className="relative h-60 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white">
                  {event.badge}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                        Prism Nightclub
                      </p>
                      <p className="text-2xl font-semibold text-white">{event.title}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/70 px-3 py-2 text-sm text-slate-100">
                      {event.rating} ★
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-slate-300">{event.time}</div>
                </div>
              </div>
              <div className="space-y-4 bg-slate-100 p-5 text-slate-900">
                <div>
                  <p className="font-semibold">{event.location}</p>
                  <p className="text-sm text-slate-500">{event.subtitle}</p>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm font-semibold text-emerald-600">
                  <span>{event.discount}</span>
                  <span>{event.note}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="w-full rounded-3xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:opacity-95"
                >
                  Select Club
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
