"use client";

import { useEffect, useState } from "react";

// The looping mascot clip. Autoplay can't be turned off with CSS, so reduced
// motion is honoured here in JS: those visitors get the poster frame and the
// video file is never fetched. The caller owns size and shape via className.
export default function WelcomeVideo({ className = "" }: { className?: string }) {
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOk(!query.matches);

    const onChange = (e: MediaQueryListEvent) => setMotionOk(!e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={`overflow-hidden bg-black ${className}`}>
      {motionOk ? (
        <video
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
        <img src="/media/welcome-poster.jpg" alt="" className="h-full w-full object-cover" />
      )}
    </div>
  );
}
