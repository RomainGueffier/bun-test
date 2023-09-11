import { useState } from 'react'
import RootLayout from '../layouts/RootLayout'

export default function Homepage() {
  const [count, setCount] = useState(0)

  return (
    <RootLayout meta={{ title: 'homepage' }}>
      <h1>Homepage</h1>
      <img src="/logo.png" />
      <button onClick={() => setCount((prev) => prev + 1)}>
        clicked {count} times
      </button>
    </RootLayout>
  )
}
