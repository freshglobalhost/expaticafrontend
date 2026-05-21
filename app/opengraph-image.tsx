import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} — Premium Digital Banking`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a1628 0%, #0d3d4a 50%, #0a1628 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#5eead4",
            marginBottom: 16,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          Premium digital banking, loans & investments
        </div>
        <div style={{ fontSize: 26, marginTop: 28, color: "#94a3b8", maxWidth: 800 }}>
          Instant loans · Virtual cards · Crypto · Global transfers
        </div>
      </div>
    ),
    { ...size }
  );
}
