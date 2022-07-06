import Head from "next/head";

export default function HeadLayout({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
