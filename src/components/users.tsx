type User = {
  id: number
  email: string
}

async function getUsers(): Promise<User[]> {
  'use cache'

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { tags: ['users'] },
  })
  return res.json()
}

export async function Users() {
  const users = await getUsers()

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  )
}
