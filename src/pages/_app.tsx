import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [Layout, setLayout] =
  useState<({ children }: { children: ReactNode }) => JSX.Element>(
  () => DefaultLayout,
  );
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const isAdmin = url.startsWith("/MNJ-Volunteer-English-Teacher/admin");
      setLayout(isAdmin ? () => AdminLayout : () => DefaultLayout);
    };

    const handleRouteChangeComplete = (url: string) => {
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
      <meta name="description" content="Website for the MNJ Volunteer English Teacher project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MNJ-Volunteer-English-Teacher/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
