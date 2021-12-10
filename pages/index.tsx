import { EntryCollection } from "contentful";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";

import Navbar from "../components/Navbar";
import Algolia from "../lib/algoliaService";
import Contentful from "../lib/contentfulService";
import { INewsConfig } from "../types";

import styles from "../styles/Home.module.css";

const Home = ({ newsConfig, news }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(newsConfig.items[0]);
  console.log(news);

  return (
    <div className={styles.container}>
      <Head>
        <title>Credible Mind</title>
        <meta name="description" content="Credible Mind news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar
          logoURL={newsConfig.items[0].fields.logo.fields.file.url}
          menuLabel={newsConfig.items[0].fields.menuLabel}
        />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ newsConfig: EntryCollection<INewsConfig>, news: any }> = async () => {
  const newsConfig = await Contentful.getEntries<INewsConfig>({ content_type: 'newsConfig' });
  // TODO - Add type for news.
  const newsIndex = Algolia.initIndex('news');
  const news = await newsIndex.search('');

  return {
    props: {
      newsConfig,
      news,
    },
  };
};

export default Home;
