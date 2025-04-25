import { SignInButton } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 text-center text-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-md md:text-6xl">
          Jadur Box ✨
        </h1>

        <p className="mb-8 max-w-xl text-lg text-neutral-300 md:text-xl">
          Sign in to access your magical cloud drive. Safe, secure, and always available — anywhere, anytime.
        </p>

        <SignInButton forceRedirectUrl="/drive" mode="modal">
          <button className="rounded-xl border border-purple-700 bg-purple-800 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            Sign In to Jadur Box
          </button>
        </SignInButton>
      </div>

      <footer className="w-full px-6 py-8 text-center text-sm text-neutral-400">
        <p>
          <br />
          <span className="text-neutral-500">© {new Date().getFullYear()} Jadur Box. All rights reserved.</span>
        </p>
      </footer>
    </main>
  );
}