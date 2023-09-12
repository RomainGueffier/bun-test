import { renderToReadableStream } from 'react-dom/server'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

const PROJECT_ROOT = import.meta.dir
const PUBLIC_DIR = PROJECT_ROOT + '/public'
const BUILD_DIR = PROJECT_ROOT + '/.cache'

const fileRouter = new Bun.FileSystemRouter({
  dir: PROJECT_ROOT + '/src/pages',
  style: 'nextjs',
})

await Bun.build({
  entrypoints: [
    import.meta.dir + '/hydrate.tsx',
    ...Object.values(fileRouter.routes),
  ],
  outdir: BUILD_DIR,
  target: 'browser',
  splitting: true,
})

const stylesFile = Bun.file(PROJECT_ROOT + '/src/styles/globals.css')
postcss([autoprefixer, tailwindcss])
  .process(await stylesFile.text(), {
    from: PROJECT_ROOT + '/src/styles/globals.css',
    to: BUILD_DIR + '/styles.css',
  })
  .then((result) => {
    Bun.write(BUILD_DIR + '/styles.css', result.css)
    if (result.map) {
      Bun.write(BUILD_DIR + '/styles.css.map', result.map.toString())
    }
  })

const cacheRouter = new Bun.FileSystemRouter({
  dir: BUILD_DIR + '/src/pages',
  style: 'nextjs',
})

Bun.serve({
  port: 3000,
  async fetch(req) {
    const match = fileRouter.match(req)
    if (match) {
      const route = cacheRouter.match(req)
      if (!route) return new Response('Unknown error', { status: 500 })

      const Component = await import(match.filePath)
      const stream = await renderToReadableStream(
        <Component.default params={route.params} query={route.query} />,
        {
          bootstrapScriptContent: `
            globalThis.PAGE_PATH = "/src/pages/${route.src}";
            globalThis.PAGE_PROPS = JSON.parse('${JSON.stringify({
              params: route.params,
              query: route.query,
            })}')
          `,
          bootstrapModules: ['/hydrate.js'],
        },
      )

      return new Response(stream, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    let pathname = new URL(req.url).pathname
    if (pathname === '/') pathname = '/index.html'

    const publicFile = Bun.file(PUBLIC_DIR + pathname)
    if (await publicFile.exists()) {
      return new Response(publicFile)
    }

    const cacheFile = Bun.file(BUILD_DIR + pathname)
    if (await cacheFile.exists()) {
      return new Response(cacheFile)
    }

    return new Response('Ressource not found', { status: 404 })
  },
})
