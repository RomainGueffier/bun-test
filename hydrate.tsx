import { hydrateRoot } from 'react-dom/client'

const { default: App } = await import((globalThis as any).PATH_TO_PAGE)

//@ts-ignore
hydrateRoot(document, <App />)
