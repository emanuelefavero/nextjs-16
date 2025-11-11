import { SLUGS } from '@/app/mdx-blog/slugs'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const { default: MDXContent } = await import(
    `@/app/mdx-blog/content/${slug}.mdx`
  )

  return <MDXContent />
}

// ---

export function generateStaticParams() {
  return SLUGS.map((slug: string) => ({
    slug,
  })) // [{ slug: 'about' }, { slug: 'hello' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Simple title generation based on slug
  const title = slug.charAt(0).toUpperCase() + slug.slice(1)

  return {
    title,
    description: `This is the ${title} page of the MDX Blog.`,
  }
}
