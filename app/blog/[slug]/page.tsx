import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { blogArticles, getArticleBySlug } from '@/lib/blog'

export function generateStaticParams() { return blogArticles.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = getArticleBySlug((await params).slug); return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `https://theorbit7.com/blog/${article.slug}` }, openGraph: { type: 'article', title: article.title, description: article.excerpt, images: [article.image] } } : {} }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticleBySlug((await params).slug)
  if (!article) notFound()
  const structuredData = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, datePublished: article.date, image: article.image, author: { '@type': 'Organization', name: 'The Orbit 7' }, publisher: { '@type': 'Organization', name: 'The Orbit 7' } }
  return <main className="min-h-screen bg-background"><header className="border-b border-border"><div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-6 sm:px-8"><Link href="/" className="font-serif text-2xl text-primary">The Orbit 7</Link><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft size={16} /> All insights</Link></div></header><article className="mx-auto max-w-4xl px-5 pb-24 pt-20 sm:px-8 lg:pt-28"><div className="max-w-3xl"><p className="eyebrow">{article.category} · {article.readingTime}</p><h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-[-0.045em] text-primary sm:text-7xl">{article.title}</h1><p className="mt-7 text-xl leading-8 text-muted-foreground">{article.excerpt}</p><p className="mt-5 text-sm text-muted-foreground">Published {article.date}</p></div><div className="relative mt-12 aspect-[1.8] overflow-hidden rounded-2xl"><Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover" /></div><div className="mx-auto mt-12 max-w-2xl space-y-7 text-lg leading-8 text-primary">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></main>
}
