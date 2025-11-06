'use client'

import type { Users as UsersType } from '@/types/users'
import { useState, useTransition } from 'react'
import { getUsers } from './actions'

export function Users() {
  const [users, setUsers] = useState<UsersType | null>(null)
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const users = await getUsers()
      setUsers(users)
    })
  }

  return (
    <div>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <button onClick={handleClick}>
          {pending ? 'Loading...' : 'Fetch Users'}
        </button>
      )}
    </div>
  )
}
