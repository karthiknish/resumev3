'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/app/_providers/Theme'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { theme } = useTheme()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    // Format submission data according to the form field structure
    const submissionData = [
      {
        field: process.env.NEXT_PUBLIC_NAME_FIELD_ID,
        name: 'name',
        value: e.target.name.value,
      },
      {
        field: process.env.NEXT_PUBLIC_EMAIL_FIELD_ID,
        name: 'email',
        value: e.target.email.value,
      },
      {
        field: process.env.NEXT_PUBLIC_MESSAGE_FIELD_ID,
        name: 'message',
        value: e.target.message.value,
      },
    ]

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: process.env.NEXT_PUBLIC_FORM_ID,
          submissionData: submissionData,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        e.target.reset()
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <head>
        <title>Karthik Nishanth - Contact</title>
        <meta
          name="description"
          content="Get in touch with Karthik Nishanth for web development, app development and performance marketing inquiries."
        />
        <meta
          name="keywords"
          content="contact, web development, app development, performance marketing, Karthik Nishanth"
        />
        <meta property="og:title" content="Contact Karthik Nishanth" />
        <meta
          property="og:description"
          content="Get in touch with Karthik Nishanth for web development, app development and performance marketing inquiries."
        />
        <meta property="og:type" content="website" />
      </head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative isolate bg-black bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)]"
      >
        <div className="absolute  bg-black " />
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white"
              >
                Get in touch
              </motion.h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Have a project in mind? Let's discuss how we can work together to bring your ideas
                to life.
              </p>
            </div>
          </div>

          <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              {success ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md bg-green-900 p-4"
                >
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-100">
                        Thank You For Contacting!
                      </h3>
                      <div className="mt-2 text-sm text-green-200">
                        <p>I will reach back to you soon.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-100">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-800 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-800 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-100">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-800 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 w-full"
                  >
                    {loading ? 'Submitting...' : 'Send message'}
                  </motion.button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
