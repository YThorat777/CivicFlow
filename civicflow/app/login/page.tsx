import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink-700 px-12 py-10 text-paper lg:flex">
        <div className="textured absolute inset-0" aria-hidden />
        <div className="relative z-10">
          <p className="font-display text-2xl font-semibold tracking-tight">
            Civic<span className="italic text-signal">Flow</span>
          </p>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="font-display text-3xl italic leading-snug text-ink-50">
            &ldquo;One portal for every civic request — submitted, tracked, and
            resolved in the open.&rdquo;
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="civic-stamp border-signal-light text-signal-light">
              Approved
            </span>
            <span className="civic-stamp border-ink-300 text-ink-200">
              In Review
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-paper px-6 py-16 lg:w-1/2">
        <div className="mb-10 w-full max-w-sm lg:hidden">
          <p className="font-display text-2xl font-semibold tracking-tight text-ink-900">
            Civic<span className="italic text-signal">Flow</span>
          </p>
        </div>

        <div className="mb-8 w-full max-w-sm">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-slate">
            Access your applications, documents, and service history.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
