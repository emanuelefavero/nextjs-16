'use client'

import type { Users as UsersType } from '@/types/users'
import { Suspense } from 'react'
import { UsersList } from './users-list'

async function getUsers(): Promise<UsersType> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=10',
  )
  return res.json()
}

export function Users() {
  const usersPromise = getUsers()

  return (
    <Suspense fallback={<p>Loading users...</p>}>
      <UsersList usersPromise={usersPromise} />
    </Suspense>
  )
}
