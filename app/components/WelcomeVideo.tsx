"use client";

import { useEffect, useRef, useState } from "react";

// The looping mascot clip. Autoplay can't be turned off with CSS, so reduced
// motion is honoured here in JS: those visitors get the poster frame and the
// video file is never fetched.
export default function WelcomeVideo() {
  const [motionOk, setMotionOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!query.matches);

    const onChange = (e: MediaQueryListEvent) => setMotionOk(!e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-xl bg-black sm:min-h-[360px]">
      {motionOk ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/media/welcome.mp4"
          poster="/media/welcome-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/media/welcome-poster.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      )}

      {/* Scrim so the wordmark stays legible over a bright, busy frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      />

      <p className="absolute bottom-5 left-5 font-display text-xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-white drop-shadow sm:bottom-7 sm:left-7 sm:text-2xl">
        Explore.
        <br />
        Learn.
        <br />
        <span className="text-gold">Build.</span>
      </p>
    </div>
  );
}
