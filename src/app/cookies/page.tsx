import { LinkWithViews } from './components/link-with-views'

export default async function Page() {
  return (
    <>
      <h1>Cookies</h1>

      <LinkWithViews href='/cookies/sub-page'>
        Go to Cookies Sub Page
      </LinkWithViews>
    </>
  )
}
