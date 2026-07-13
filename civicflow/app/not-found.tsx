import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="civic-stamp border-rust-dark bg-rust-light text-rust-dark">
        Not found
      </span>
      <h1 className="mt-5 font-display text-3xl font-semibold text-ink-900">
        This page isn&apos;t on file
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate">
        The page you requested doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 rounded-md bg-ink-700 px-4 py-2.5 text-sm font-medium text-paper hover:bg-ink-800"
      >
        Return to dashboard
      </Link>
    </div>
  );
}
