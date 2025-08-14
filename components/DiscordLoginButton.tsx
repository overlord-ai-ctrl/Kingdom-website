"use client";
import confetti from "canvas-confetti";
import { Button } from "./ui/Button";
import { useCallback } from "react";

export default function DiscordLoginButton() {
  const onClick = useCallback(() => {
    confetti({
      particleCount: 120,
      spread: 65,
      origin: { y: 0.6 },
    });
    // If next-auth is installed, you can do:
    // import { signIn } from "next-auth/react";
    // signIn("discord");
    // Fallback to route:
    window.location.href = "/api/auth/signin";
  }, []);

  return (
    <Button onClick={onClick} variant="primary" size="lg" className="gap-2">
      <svg
        width="20"
        height="20"
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
    </Button>
  );
}
