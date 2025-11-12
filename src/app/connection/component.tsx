import { connection } from 'next/server'

// * connection converts the component to be dynamically rendered at runtime even if doesn't use dynamic APIs like cookies, headers or search params.

export async function Component() {
  await connection()
  const date = new Date()

  return <p>Connected at: {date.toISOString()}</p>
}
