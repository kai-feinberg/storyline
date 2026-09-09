import { Metadata, Viewport } from "next";
import "../../styles/global.css";
import { AgentationDevtools } from "../components/AgentationDevtools";

export const metadata: Metadata = {
  title: "StorySketch",
  description:
    "Turn marketing scripts into polished StorySketch videos with AI voiceover, editable scenes, and fast MP4 export.",
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
        <AgentationDevtools />
      </body>
    </html>
  );
}
