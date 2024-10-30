import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InvolvedSection from '@/components/InvolvedSection';
import Menu from '@/components/Menu';
import PostList from '@/components/PostList';
import ProjectSection from '@/components/ProjectSection';
import Top from '@/components/Top';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>MNJ Volunteer English Teacher</title>
        <meta name="description" content="Website for the MNJ Volunteer English Teacher project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MNJ-Volunteer-English-Teacher/favicon.ico" />
      </Head>
      <main>
        <Top></Top>
        <Menu></Menu>
        <Hero></Hero>
        <InvolvedSection></InvolvedSection>
        <GallerySection></GallerySection>
        <ProjectSection></ProjectSection>
        <BlogSection></BlogSection>
        <Footer></Footer>
      </main>
    </>
  );
};

export default Home;
