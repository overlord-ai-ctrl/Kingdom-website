export default function Page() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-2xl bg-brand-primary/20 border border-brand-primary/30 grid place-items-center">
            <span className="text-brand-primary font-bold text-4xl">N</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="h1 text-center">Welcome to The Network</h1>
          <p className="mt-4 text-brand-muted text-lg max-w-md mx-auto">
            Build, collaborate, and level up through daily, weekly, and monthly
            challenges.
          </p>
        </div>

        {/* Discord Login Button */}
        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/api/auth/signin")}
            className="h-14 px-8 rounded-xl bg-brand-primary hover:bg-brand-primary600 text-white transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring text-lg font-medium flex items-center gap-3"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden
              className="opacity-90"
            >
              <path
                fill="currentColor"
                d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.36-.43.85-.589 1.237a18.27 18.27 0 0 0-4-.006c-.16-.39-.39-.88-.59-1.24A19.736 19.736 0 0 0 6.8 4.37C3.72 8.91 2.88 13.33 3.16 17.69a19.927 19.927 0 0 0 4.89 2.52c.4-.55.76-1.13 1.07-1.75c-.59-.22-1.16-.49-1.69-.81c.14-.1.28-.2.41-.31c3.26 1.52 6.77 1.52 10 0c.14.11.28.21.42.31c-.53.32-1.1.59-1.7.81c.31.62.67 1.2 1.08 1.75a19.92 19.92 0 0 0 4.89-2.52c.34-5.33-.57-9.71-3.07-13.32zM9.68 14.67c-.78 0-1.42-.72-1.42-1.6c0-.89.63-1.6 1.42-1.6s1.43.72 1.43 1.6c0 .88-.64 1.6-1.43 1.6m4.66 0c-.78 0-1.42-.72-1.42-1.6c0-.89.64-1.6 1.42-1.6c.79 0 1.43.72 1.43 1.6c0 .88-.64 1.6-1.43 1.6"
              />
            </svg>
            Log in with Discord
          </button>
        </div>
      </div>
    </div>
  );
}
