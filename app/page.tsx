'use client';

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import InfoPanel from "./components/InfoPanel";
import InviteModal from "./components/InviteModal";
import VerificationModal from "./components/VerificationModal";

const navigationItems = [
  {
    label: "My Plan",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18" />
        <path d="M6 11h12" />
        <path d="M10 15h4" />
      </svg>
    ),
  },
  {
    label: "My Bids",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 5.3 18.7 9.3" />
        <path d="m7 16 4.7 4.7" />
        <path d="M5 11L13 3l5 5-8 8-5 1Z" />
      </svg>
    ),
  },
  {
    label: "My Booking",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Search",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    label: "Chat Room",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    label: "Save & Like",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Rewards",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 15 8l6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1 3-6z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: 1,
    label: "Spot Your Person",
    description: "Pick someone you'd genuinely enjoy going out with.",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=240&q=80",
  },
  {
    number: 2,
    label: "Send a Drink",
    description: "Offer their first drink your way of saying let's go out.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=240&q=80",
  },
  {
    number: 3,
    label: "They Accept — You're Set",
    description: "Once accepted, it's a confirmed plan. No endless chatting.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=240&q=80",
  },
];

const perks = [
  "Get noticed faster",
  "Higher chances your invite gets accepted",
  "Unlock drink invites & premium interactions",
  "Build trust with every profile visit",
];

export default function Home() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteStep, setInviteStep] = useState<1 | 2>(1);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const openInvite = () => {
    setInviteStep(1);
    setInviteOpen(true);
  };

  const closeInvite = () => {
    setInviteStep(1);
    setInviteOpen(false);
  };

  const openVerify = () => {
    setVerifyOpen(true);
  };

  const closeVerify = () => {
    setVerifyOpen(false);
  };

  return (
    <>
      <main
        style={{
          background: "radial-gradient(circle at top, rgba(99,102,241,0.15), transparent 45%), radial-gradient(circle at right, rgba(236,72,153,0.12), transparent 35%), linear-gradient(180deg, #f8f5ff 0%, #f7f5ff 30%, #f3f2f8 100%)",
        }}
        className="min-h-screen px-4 py-8 text-slate-900 sm:px-6 lg:px-10"
      >
        <div className="mx-auto flex max-w-full gap-8 xl:gap-10" style={{ minHeight: 760, maxWidth: 1480 }}>
          <Sidebar items={navigationItems} />

          <section className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-4xl border border-white/80 bg-white/80 px-6 py-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-violet-500/20">
                Explore Feed
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Discover new matches</p>
                <h1 className="text-3xl font-semibold text-slate-950">Find your next plan tonight</h1>
              </div>
            </div>

            <ProfileCard
              imageUrl="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
              name="Zoe Miller"
              age={22}
              mutuals={4}
              tags={["Bollywood Nights", "Chill Crowd", "Party Regular"]}
              vibeLabel="Matches Your Vibe"
              onGoTonight={openInvite}
            />
          </section>

          <InfoPanel
            title="Make Your First Move"
            subtitle="Verify your profile to start sending invites and offering drinks."
            steps={steps}
            perks={perks}
            onVerify={openVerify}
          />
        </div>
      </main>

      <InviteModal
        open={inviteOpen}
        step={inviteStep}
        onClose={closeInvite}
        onConfirm={() => setInviteStep(2)}
      />
      <VerificationModal open={verifyOpen} onClose={closeVerify} />
    </>
  );
}
