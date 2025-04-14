import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* You can add other meta tags, fonts, etc. here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}