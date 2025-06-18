"use client";
import { useEffect } from "react";

export default function InAppRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    const isInApp =
      ua.includes("FBAN") ||
      ua.includes("FBAV") ||
      ua.includes("Instagram") ||
      ua.includes("Messenger");

    if (isInApp) {
      window.location.href = "https://job-tracker-phi-nine.vercel.app"; // Your site URL
    }
  }, []);

  return <div>Redirecting...</div>;
}
