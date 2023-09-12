import { hydrateRoot } from 'react-dom/client'

const { default: App } = await import((globalThis as any).PAGE_PATH)
const props = (globalThis as any).PAGE_PROPS

console.log(props)

//@ts-ignore
hydrateRoot(document, <App {...props} />)
