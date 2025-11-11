import { cookies } from 'next/headers'

export default async function Views() {
  const cookieStore = await cookies()
  const views = cookieStore.get('views')?.value || '0'

  return (
    <>
      <p>You have visited this page {views} times.</p>
    </>
  )
}
