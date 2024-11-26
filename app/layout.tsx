import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CommandMenu from "@/components/command-menu";
import MatrixBackground from "@/components/matrix-background";
import ThemeSelector from "@/components/theme-selector";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paras",
  description: "Paras' Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="matrix"
          enableSystem={false}
          themes={["matrix", "dracula", "monokai", "nord", "solarizedDark"]}
        >
          <MatrixBackground />
          <CommandMenu />
          <ThemeSelector />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}