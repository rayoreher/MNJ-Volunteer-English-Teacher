import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import PostList from '@/components/PostList';
import Top from '@/components/Top';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Posts list</title>
        <meta name="description" content="Blog made with NextJs and Supabase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MNJ-Volunteer-English-Teacher/favicon.ico" />
      </Head>
      <main>
        <Top></Top>
        <Menu></Menu>
        <Hero></Hero>
        <Header />
        <PostList />
      </main>
    </>
  );
};

export default Home;
