'use client'

import type { Users as UsersType } from '@/types/users'
import { use } from 'react'

type Props = {
  usersPromise: Promise<UsersType>
}

export function UsersList({ usersPromise }: Props) {
  const users = use(usersPromise)

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
