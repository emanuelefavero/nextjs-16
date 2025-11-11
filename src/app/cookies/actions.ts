'use server'

import { cookies } from 'next/headers'

export async function incrementViews() {
  const cookieStore = await cookies()

  const hasViews = cookieStore.has('views')
  const currentViews = hasViews ? Number(cookieStore.get('views')?.value) : 0
  const newViews = currentViews + 1

  // Set the updated views cookie
  cookieStore.set({
    name: 'views',
    value: newViews.toString(),
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}
