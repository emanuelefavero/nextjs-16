'use server'

import type { Users } from '@/types/users'

export async function getUsers() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=10',
  )
  const users: Users = await res.json()
  return users
}
