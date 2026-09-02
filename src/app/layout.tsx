import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  IBM_Plex_Mono,
  League_Gothic,
} from "next/font/google";

import "../styles/globals.css";
import Sidebar from "../components/blackxcross/Sidebar";
import TopBar from "../components/blackxcross/TopBar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-league-gothic",
});

export const metadata: Metadata = {
  title: "BlackXCross",
  description:
    "BlackXCross is a modern finance solution for small teams. It connects your accounts, categorizes every transaction, and closes your books automatically.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${spaceGrotesk.variable}
        ${manrope.variable}
        ${plexMono.variable}
        ${leagueGothic.variable}
      `}
    >
      <body className="font-body antialiased">
        <div className="min-h-screen w-full">
          <div className="flex min-h-screen w-full flex-col lg:flex-row">
            <Sidebar />

            <main className="min-w-0 flex-1 overflow-x-hidden">
              <TopBar />

              <div className="w-full">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
