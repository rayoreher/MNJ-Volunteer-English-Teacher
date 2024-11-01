import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Website for the MNJ Volunteer English Teacher project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MNJ-Volunteer-English-Teacher/favicon.ico" />
      </Head>
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}
