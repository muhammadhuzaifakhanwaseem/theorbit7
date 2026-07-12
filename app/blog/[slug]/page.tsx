"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function BlogInnerPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // API call using the slug from the URL
    fetch(`https://backend.theorbit7.com/api/v1/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.blog)
        setLoading(false)
      })
      .catch((err) => console.error("Error fetching blog:", err))
  }, [slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  console.log(blog)

  return (
    <main className="w-full pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-sm">
              {blog?.category?.name}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-4 mb-6">
              {blog?.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-500">
              <span>{blog?.author_name}</span>
              <span>•</span>
              <span>{new Date(blog?.published_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog?.featured_image_url && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={blog.featured_image_url} 
                alt={blog.featured_image_alt || blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Blog Content */}
          <article className="glassmorphic-card p-8 md:p-12 rounded-2xl">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog?.body }} 
            />
          </article>
        </ScrollReveal>
      </div>
    </main>
  )
}