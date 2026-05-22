"use client";

import { useEffect } from "react";

const TAWK_EMBED_SRC =
  "https://embed.tawk.to/6a0fe3ba4f6e5f1c34611d76/1jp7134ts";

declare global {
  interface Window {
    Tawk_API?: { maximize?: () => void; hideWidget?: () => void; showWidget?: () => void };
    Tawk_LoadStart?: Date;
  }
}

/** Loads Tawk.to once per tab. Third-party script may log to the console in dev — that is not from our app. */
export function TawkWidget() {
  useEffect(() => {
    if (document.getElementById("tawk-embed-script")) {
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const embed = document.createElement("script");
    embed.id = "tawk-embed-script";
    embed.async = true;
    embed.src = TAWK_EMBED_SRC;
    embed.charset = "UTF-8";
    embed.setAttribute("crossorigin", "*");

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(embed, firstScript);
  }, []);

  return null;
}
