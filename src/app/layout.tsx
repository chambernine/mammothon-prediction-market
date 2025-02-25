import PrivyClientProvider from "@/providers/privy-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PrivyClientProvider>
            {children}
            <Toaster />
          </PrivyClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
