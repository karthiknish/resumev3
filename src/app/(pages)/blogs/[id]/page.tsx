'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Head from 'next/head'
async function getPost(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${id}?depth=1`, {
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    notFound()
  }

  return response.json()
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  if (!post) {
    notFound()
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.meta?.description} />
        <meta name="keywords" content={post.meta?.keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta?.description} />
        <meta property="og:image" content={post.meta?.image?.url} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/blogs/${post.id}`} />
      </Head>
      <div className="relative overflow-clip bg-black bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-10">
        <div className="absolute bg-black" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container relative mx-auto"
        >
          <article className="prose prose-lg mx-auto prose-invert">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white"
            >
              {post.title}
            </motion.h1>

            {post.meta?.image && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative h-[400px] w-full"
              >
                <Image
                  src={post.meta.image.url}
                  alt={post.meta.image.alt || post.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-sm text-gray-300"
            >
              Published on:{' '}
              {new Date(post.publishedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </motion.div>

            {post.hero?.richText?.map((block, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-gray-200"
              >
                {block.children?.map((child, childIndex) => (
                  <p key={childIndex}>{child.text}</p>
                ))}
              </motion.div>
            ))}

            {post.layout?.map((block, index) => {
              if (block.blockType === 'content') {
                return (
                  <motion.div
                    key={block.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="content-block text-gray-200"
                  >
                    {block.children?.map((child, childIndex) => (
                      <p key={childIndex}>{child.text}</p>
                    ))}
                  </motion.div>
                )
              }
              return null
            })}
          </article>
        </motion.div>
      </div>
    </>
  )
}
