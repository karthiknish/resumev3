'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

async function getPosts(page = 1, limit = 6) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?page=${page}&limit=${limit}&depth=1`,
      {
        next: { revalidate: 0 },
      },
    )

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      throw new Error('Failed to fetch posts')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export default function BlogsPage() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPosts(currentPage)
        setPosts(data.docs)
        setTotalPages(Math.ceil(data.totalDocs / data.limit))
      } catch (error) {
        console.error('Error loading posts:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [currentPage])

  return (
    <>
      <Head>
        <title>Karthik Nishanth - Blog</title>
        <meta
          name="description"
          content="Read articles about web development, app development, and performance marketing."
        />
        <meta
          name="keywords"
          content="blog, web development, app development, performance marketing, Karthik Nishanth"
        />
      </Head>

      <div className="relative overflow-clip bg-black bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-10">
        <div className="absolute bg-black" />
        <div className="container relative mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-4xl font-bold text-white"
          >
            Blog Posts
          </motion.h1>

          {loading ? (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="overflow-hidden rounded-lg bg-black/50 shadow-lg backdrop-blur-sm"
                  >
                    <Link href={`/blogs/${post.id}`}>
                      {post.meta?.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.meta.image.url}
                            alt={post.meta.image.alt || post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h2 className="mb-2 text-xl font-semibold text-white">{post.title}</h2>
                        <p className="text-sm text-gray-300">
                          {new Date(post.publishedAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded px-4 py-2 ${
                      currentPage === page
                        ? 'bg-white text-black'
                        : 'bg-black/30 text-white hover:bg-black/50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
