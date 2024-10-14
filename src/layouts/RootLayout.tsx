interface RootLayoutProps {
  meta?: {
    title?: string
    description?: string
  }
  children: React.ReactNode
}

export default function RootLayout({ meta, children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={meta?.description ?? 'Web site created with Bun'}
        />
        <link rel="apple-touch-icon" href="/logo.png" />
        <title>{meta?.title ?? 'Bun server'}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="bg-slate-100">
        <header className="text-2xl">Bun server</header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
