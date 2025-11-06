'use client'

import type { Users as UsersType } from '@/types/users'
import { useState, useTransition } from 'react'

export function Users() {
  const [users, setUsers] = useState<UsersType | null>(null)
  const [pending, startTransition] = useTransition()

  const getUsers = async () => {
    startTransition(async () => {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/users?_limit=10',
      )
      const users: UsersType = await res.json()
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
        <button onClick={getUsers}>
          {pending ? 'Loading...' : 'Fetch Users'}
        </button>
      )}
    </div>
  )
}
