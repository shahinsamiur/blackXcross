import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  IBM_Plex_Mono,
  League_Gothic,
  Cinzel,
} from "next/font/google";
import "../styles/globals.css";
import StateWraper from "../state/stateWraper";
import AuthInitializer from "../components/AuthInitializer";
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

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "BlackXCross",
  description: "BlackXCross finance solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${plexMono.variable} ${leagueGothic.variable} ${cinzel.variable}`}
    >
      <body className="font-body antialiased">
        <StateWraper>
          <AuthInitializer />
          {children}
        </StateWraper>
      </body>
    </html>
  );
}