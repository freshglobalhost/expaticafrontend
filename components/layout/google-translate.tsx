"use client";

import { useEffect } from "react";

const SETTINGS_SCRIPT_ID = "gtranslate-settings";
const WIDGET_SCRIPT_ID = "gtranslate-float";

export function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById(WIDGET_SCRIPT_ID)) return;

    const settings = document.createElement("script");
    settings.id = SETTINGS_SCRIPT_ID;
    settings.textContent = `window.gtranslateSettings = {
      default_language: "en",
      alt_flags: { en: "usa" },
      wrapper_selector: ".gtranslate_wrapper",
      flag_style: "3d",
      flag_size: 20
    };`;
    document.body.appendChild(settings);

    const widget = document.createElement("script");
    widget.id = WIDGET_SCRIPT_ID;
    widget.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    widget.async = true;
    document.body.appendChild(widget);

    return () => {
      settings.remove();
      widget.remove();
    };
  }, []);

  return <div className="gtranslate_wrapper" aria-label="Select language" />;
}
