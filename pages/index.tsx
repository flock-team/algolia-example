import algoliasearch from 'algoliasearch/lite';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { connectSearchBox, Hits, InstantSearch } from 'react-instantsearch-dom';
import styles from '../styles/Home.module.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

// 検索を実行するために仮想ウィジェットが必要
const VirtualSearchBox = connectSearchBox(() => null);

const Home: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{
    keyword: string;
  }>();

  const search = ({ keyword }: { keyword: string }) => {
    router.push({
      query: {
        keyword,
      },
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit(search)}>
        <input
          defaultValue={router.query.keyword}
          {...register('keyword')}
          type="text"
          autoComplete="off"
        />
      </form>
      <InstantSearch
        searchState={{
          query: router.query.keyword,
        }}
        searchClient={searchClient}
        indexName="demo_ecommerce"
      >
        <VirtualSearchBox />
        <Hits />
      </InstantSearch>
    </main>
  );
};

export default Home;
