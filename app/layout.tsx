import { Footer, Layout, Navbar } from "nextra-theme-docs"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "nextra-theme-docs/style.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dannbox Documentation",
  description: "Comprehensive documentation for Dannbox - Build amazing applications with ease",
}

const footer = (
  <>
    MIT {new Date().getFullYear()} © Dannbox.
  </>
)

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="📦" />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<strong>Dannbox Docs</strong>}
            />
          }
          pageMap={await getPageMap()}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true,
            toggleButton: true
          }}
          toc={{
            title: "On this page",
            backToTop: "Scroll to top",
            float: true
          }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
