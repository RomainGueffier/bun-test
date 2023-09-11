import RootLayout from '../../layouts/RootLayout'

export default function BlogPage() {
  return (
    <RootLayout>
      <h1 className="mt-10 text-xl">Blog</h1>
      <ul>
        <li>
          <a href="/blog/hello-world">Hello world</a>
        </li>
      </ul>
    </RootLayout>
  )
}
