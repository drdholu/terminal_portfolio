import type { Metadata } from "next";
import { Jersey_25 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CommandMenu from "@/components/command-menu";
import MatrixBackground from "@/components/matrix-background";
import ThemeSelector from "@/components/theme-selector";
// import MouseBlob from "@/components/mouse-blob";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

const jetbrainsMono = Jersey_25({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "it's Paras",
  description: "Paras' Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.className} antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="matrix"
          enableSystem={false}
          themes={["matrix", "dracula", "monokai", "nord", "solarizedDark"]}
        >
          {/* <MatrixBackground /> */}
          <DottedGlowBackground
            className="pointer-events-none"
            opacity={0.9}
            gap={16}
            radius={1.8}
            color="rgba(100, 100, 100, 0.4)"
            glowColor="rgba(0, 255, 0, 0.8)"
            darkColor="rgba(150, 150, 150, 0.3)"
            darkGlowColor="rgba(0, 200, 255, 0.9)"
            backgroundOpacity={0}
            speedMin={0.2}
            speedMax={0.7}
            speedScale={1}
          />
          {/* <MouseBlob /> */}
          <CommandMenu />
          <ThemeSelector />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
