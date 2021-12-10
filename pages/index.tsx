import { EntryCollection } from "contentful";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";

import Navbar from "../components/Navbar";
import Algolia from "../lib/algoliaService";
import Contentful from "../lib/contentfulService";
import { INewsConfig } from "../types";

import styles from "../styles/Home.module.css";

const Home = ({ newsConfig, news }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Credible Mind</title>
        <meta name="description" content="Credible Mind news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar
          logoURL={newsConfig.logo.fields.file.url}
          menuLabel={newsConfig.menuLabel}
        />
        <div className={styles.contentContainer}>
          <h1 style={{ textAlign: 'center' }}>{newsConfig.ttile}</h1>
          <div className={styles.newsContainer}>
            <div className={styles.newsLeft}>
              <span className={styles.searchLabel}>{newsConfig.searchLabel}</span>
              <input type="text" />
            </div>
            <div className={styles.newsRight}>right</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ newsConfig: INewsConfig, news: any }> = async () => {
  const newsConfig = await Contentful.getEntries<INewsConfig>({ content_type: 'newsConfig' });
  // TODO - Add type for news.
  const newsIndex = Algolia.initIndex('news');
  const news = await newsIndex.search('');

  return {
    props: {
      newsConfig: newsConfig.items[0].fields,
      news,
    },
  };
};

export default Home;
