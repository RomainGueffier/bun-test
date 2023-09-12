import RootLayout from '../../layouts/RootLayout'

interface BlogArticlePageProps {
  params: {
    slug: string
  }
}

export default function BlogArticlePage({
  params: { slug },
}: BlogArticlePageProps) {
  return (
    <RootLayout meta={{ title: slug }}>
      <h1>{slug} - Blog</h1>
    </RootLayout>
  )
}
