import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-hub max-w-xl py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-2">That page doesn&apos;t exist.</h1>
      <p className="mt-3 text-muted">
        It may have moved, or the link may be wrong. Try searching from the
        sidebar, or start from one of these.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-gold">
          Home
        </Link>
        <Link href="/dictionary" className="btn-ghost">
          Browse the dictionary
        </Link>
      </div>
    </div>
  );
}
