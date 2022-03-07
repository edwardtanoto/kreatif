import Head from 'next/head';

export default function Metatags({
  title = 'Kreatif',
  description = 'The modern day freelancing.',
  image = 'https://kreatif.vercel.app/public/icons/icon-256x256.png',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}