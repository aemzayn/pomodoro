import Head from "next/head";

type Props = {};

const Index = ({}: Props) => {
  return (
    <div>
      <Head>
        <title>Hello world</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <h1>Nextjs Tailwindcss with Typescript starter</h1>
    </div>
  );
};

export default Index;
