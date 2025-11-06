import type { Users as UsersType } from '@/types/users'
import { cacheTag } from 'next/cache'

async function getUsers(): Promise<UsersType> {
  'use cache'
  cacheTag('users')

  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=10',
  )
  return res.json()
}

export async function Users() {
  const users = await getUsers()

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  )
}
