import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { AiOutlineSearch } from 'react-icons/ai';
import Link from "next/link";

import Navbar from "../components/Navbar";
import Algolia from "../lib/algoliaService";
import Contentful from "../lib/contentfulService";
import Card from "../components/Card";
import { INews, INewsConfig } from "../types";

import styles from "../styles/Home.module.css";

const Home = ({ newsConfig, news: newsData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [news, setNews] = useState(newsData);
  const [searchTerm, setSearchTerm] = useState('');

  const newsIndex = Algolia.initIndex('news');

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
              <div className={styles.searchInput}>
                <input
                  className={styles.ogInput}
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className={styles.searchButton}
                  onClick={async () => {
                    try {
                      const res = await newsIndex.search(searchTerm);
                      setNews(res);
                    } catch (error) {
                      // TODO - show a error toast.
                      console.error(error); 
                    }
                  }}
                >
                  <AiOutlineSearch color={'white'} width={12} height={12} />
                </button>
              </div>
            </div>
            <div className={styles.newsRight}>
              {news.hits.map((n: INews) => {
                return (
                  <Link
                    key={n.name}
                    href={`/news/${encodeURIComponent(n.slug)}`}
                    passHref={true}
                  >
                    <a>
                      <Card
                        topics={n.topics}
                        name={n.name}
                        description={n.description}
                        imageURL={n.imageUrl}
                        organization={n.organization}
                        publicationDate={n.publicationDate}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// News type is any since I can't find SearchResponse type from algoliasearch package.
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
