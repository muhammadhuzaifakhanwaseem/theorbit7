"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    fetch("https://backend.theorbit7.com/api/v1/blogs")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data.blogs.data.slice(0, 3)))
      .catch((err) => console.error("Error:", err))
  }, [])

  return (
    <section id="blog" className="w-full pt-12 md:pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">Latest Articles</h2>
              <p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Stay updated with our latest insights, tutorials, and best practices.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post: any, index) => (
            <ScrollReveal key={post?.id} delay={index * 0.1}>
              {/* Purani Glassmorphic class wapas laga di hai */}
              <Card className="h-full glassmorphic-card border-none overflow-hidden group soft-glow">
                <CardHeader>
                  <CardTitle className="tracking-tight">{post?.title}</CardTitle>
                  <CardDescription className="opacity-70">
                    {new Date(post?.published_at).toLocaleDateString()} · {post?.category.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground opacity-70 line-clamp-3">{post?.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${post?.slug}`}
                    className="inline-flex items-center text-sm text-primary hover:underline transition-colors"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}