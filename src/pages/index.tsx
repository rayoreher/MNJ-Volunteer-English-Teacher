import Head from 'next/head';
import Main from '@/components/Main';

const Home = () => {
  return (
    <>
      <Head>
        <title>MNJ Volunteer English Teacher</title>
        <meta name="description" content="Website for the MNJ Volunteer English Teacher project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MNJ-Volunteer-English-Teacher/favicon.ico" />
      </Head>
      <Main />
    </>
  );
};

export default Home;

