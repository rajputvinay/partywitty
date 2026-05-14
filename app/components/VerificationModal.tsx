"use client";

import React, { useEffect, useRef, useState } from "react";

type VerificationModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function VerificationModal({ open, onClose }: VerificationModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (!open || modalStep !== 1) return;
    const video = videoRef.current;
    let mediaStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        setStream(mediaStream);
        if (video) {
          video.srcObject = mediaStream;
          await video.play();
        }
      } catch {
        setCameraError("Unable to access camera. Please allow camera permissions and try again.");
      }
    };

    startCamera();

    return () => {
      if (video) video.srcObject = null;
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [open, modalStep]);

  const closeModal = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setCameraError(null);
    setCapturedPhoto(null);
    setModalStep(1);
    setPhotos([]);
    onClose();
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedPhoto(photoUrl);
    setPhotos((prev) => [photoUrl, ...prev].slice(0, 6));
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setModalStep(2);
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotos((prev) => [result, ...prev].slice(0, 6));
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const openVibeScreen = () => {
    setModalStep(3);
  };

  const finishVerification = () => {
    closeModal();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 px-3 py-6 backdrop-blur-sm sm:px-4">
      <div className="w-full max-w-2xl rounded-[30px] border border-white/20 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-600">
              {modalStep === 3 ? "Verification Success" : "Show your vibe"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
              {modalStep === 3 ? "Show your vibe" : modalStep === 2 ? "You're verified" : "Show your best face"}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {modalStep === 1
                ? "We're checking your identity so you can send verified invites."
                : modalStep === 2
                ? "No fake vibes here. You're almost in."
                : "Add up to 6 photos people will actually vibe with."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm shadow-slate-900/5 transition hover:bg-slate-200"
          >
            <span className="text-xl leading-none">x</span>
          </button>
        </div>

        {modalStep === 1 && (
          <div className="mt-8 grid gap-6 rounded-[28px] border border-slate-200 bg-slate-100 p-4 shadow-sm shadow-slate-900/5 sm:mt-10 sm:p-6">
            {cameraError ? (
              <div className="rounded-4xl bg-white p-8 text-center text-sm text-slate-700 shadow-sm shadow-slate-900/5">
                <p className="font-semibold text-slate-900">Camera access required</p>
                <p className="mt-2">{cameraError}</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-4xl bg-slate-950">
                <div className="relative h-80 bg-slate-900 sm:h-96">
                  <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
                    <div className="mx-auto mt-10 h-60 w-60 rounded-3xl border-2 border-white/70 bg-white/0 shadow-xl shadow-slate-950/20" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2 text-sm text-slate-600">
                <p className="font-semibold text-slate-950">Capture a clear selfie</p>
                <p>Position your face in the frame and tap the button when ready.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={takePhoto}
                  disabled={!!cameraError}
                  className="rounded-full bg-linear-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-fuchsia-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Take Photo
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {modalStep === 2 && capturedPhoto && (
          <div className="mt-8 grid gap-6 rounded-[28px] border border-slate-200 bg-slate-100 p-4 shadow-sm shadow-slate-900/5 sm:mt-10 sm:p-6">
            <div className="rounded-[28px] bg-white p-5 text-center shadow-sm shadow-slate-900/5 sm:p-8">
              <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full bg-slate-100 shadow-xl shadow-slate-900/10">
                <img src={capturedPhoto} alt="Captured verification" className="h-48 w-48 rounded-full object-cover sm:h-52 sm:w-52" />
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25">
                  <span>✓</span>
                  Verified
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-semibold text-slate-950 sm:text-3xl">You&apos;re verified</h3>
                <p className="text-sm leading-6 text-slate-500">No fake vibes here. You&apos;re almost in.</p>
                <div className="mx-auto mt-4 h-3 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[98.4%] rounded-full bg-violet-500" />
                </div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Identity match 98.4%</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={openVibeScreen}
                className="w-full rounded-full bg-linear-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-fuchsia-500/20 transition hover:opacity-95"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {modalStep === 3 && (
          <div className="mt-8 space-y-6 rounded-[28px] border border-slate-200 bg-slate-100 p-4 shadow-sm shadow-slate-900/5 sm:mt-10 sm:p-6">
            <div className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Show your vibe</p>
                  <h3 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">Add up to 6 photos people will actually vibe with</h3>
                </div>
                <span className="text-sm font-semibold text-slate-700">{photos.length}/6 added</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-slate-950" style={{ width: `${(photos.length / 6) * 100}%` }} />
              </div>
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm shadow-slate-900/5">
                Profiles with 4+ photos get 3x more invites
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[...Array(6)].map((_, idx) => {
                const photo = photos[idx];
                if (photo) {
                  return (
                    <div key={idx} className="relative overflow-hidden rounded-4xl bg-slate-900 shadow-sm shadow-slate-900/10">
                      <img src={photo} alt={`Vibe ${idx + 1}`} className="h-40 w-full object-cover sm:h-52" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-lg shadow-slate-950/30"
                      >
                        🗑
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={handleAddPhotoClick}
                    className="flex h-40 flex-col items-center justify-center gap-3 rounded-4xl border border-dashed border-slate-300 bg-slate-200 text-slate-500 shadow-sm shadow-slate-900/5 transition hover:border-slate-400 hover:bg-slate-100 sm:h-52"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-slate-700">+</span>
                    <span className="text-sm font-semibold">Add Photo</span>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-4xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-900/5">
                <p className="font-semibold">Hint</p>
                <p className="mt-2 text-slate-500">With friends</p>
              </div>
              <div className="rounded-4xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-900/5">
                <p className="font-semibold">Hint</p>
                <p className="mt-2 text-slate-500">Candid & posed</p>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            <button
              type="button"
              onClick={finishVerification}
              className="w-full rounded-full bg-linear-to-r from-fuchsia-600 via-violet-600 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-fuchsia-500/20 transition hover:opacity-95"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
