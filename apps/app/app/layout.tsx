import type { Metadata } from "next";
import { env } from "@/env";
import "./styles.css";
import { AnalyticsProvider } from "@repo/analytics/provider";
import { DesignSystemProvider } from "@repo/design-system";
import { fonts } from "@repo/design-system/lib/fonts";
import { Toolbar } from "@repo/feature-flags/components/toolbar";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Upcube Research",
    template: "%s — Upcube Research",
  },
  description:
    "Search, analyze, save, and monitor web intelligence with Upcube Research.",
};

interface RootLayoutProperties {
  readonly children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html className={fonts} lang="en" suppressHydrationWarning>
    <body>
      <AnalyticsProvider>
        <DesignSystemProvider
          helpUrl={env.NEXT_PUBLIC_DOCS_URL}
          privacyUrl={new URL(
            "/legal/privacy",
            env.NEXT_PUBLIC_WEB_URL
          ).toString()}
          termsUrl={new URL("/legal/terms", env.NEXT_PUBLIC_WEB_URL).toString()}
        >
          {children}
        </DesignSystemProvider>
      </AnalyticsProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
