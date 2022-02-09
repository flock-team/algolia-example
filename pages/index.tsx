import algoliasearch from 'algoliasearch/lite';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SearchState } from 'react-instantsearch-core';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import CustomHits from '../components/custom-hits';
import CustomHitsPerPage from '../components/custom-hits-per-page';
import CustomPagination from '../components/custom-pagination';
import CustomRefinementList from '../components/custom-refinement-list';
import CustomSearchBox from '../components/custom-search-box';
import CustomSortBy from '../components/custom-sort-by';
import CustomStateResults from '../components/custom-state-results';

const searchClient = algoliasearch(
  'U40IN2BSNL',
  '8dbe8229a8131dc893bbe7d0d433bbaf'
);

const Home: NextPage = () => {
  const router = useRouter();

  const updateQueryParams = (state: SearchState) => {
    console.log(state);
    router.push(
      {
        query: {
          q: state.query || [],
          hitsPerPage: state.hitsPerPage || [],
          page: state.page || [],
          sortBy: state.sortBy || [],
          ...state.refinementList,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const getDefaultRefinement = () => {
    const gender = router.query.gender;

    if (!gender || !gender.length) {
      return;
    }

    if (typeof gender === 'string') {
      return [gender];
    } else {
      return gender;
    }
  };

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <InstantSearch
        onSearchStateChange={updateQueryParams}
        searchClient={searchClient}
        indexName="dev_users_desc"
      >
        <Configure hitsPerPage={4} />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2>検索結果</h2>
              <div>
                <CustomSortBy
                  defaultRefinement={router.query.sortBy || 'dev_users_desc'}
                  items={[
                    {
                      label: '最新順',
                      value: 'dev_users_desc',
                    },
                    {
                      label: '古い順',
                      value: 'dev_users_asc',
                    },
                  ]}
                />
              </div>
            </div>
            <CustomHits />
            <div className="flex items-center space-x-4 mt-6">
              <CustomHitsPerPage
                items={[
                  {
                    value: 5,
                    label: '5',
                  },
                  {
                    value: 20,
                    label: '20',
                  },
                  {
                    value: 50,
                    label: '50',
                  },
                ]}
                defaultRefinement={
                  Number(router.query.hitsPerPage as string) || 5
                }
              />
              <span className="flex-1"></span>
              <CustomStateResults />
              <CustomPagination
                defaultRefinement={Number(router.query.page) || 1}
              />
            </div>
          </div>
          <div className="space-y-4">
            <CustomSearchBox defaultRefinement={router.query.q as string} />
            <div>
              <h2 className="block text-sm font-medium text-gray-900 mb-4">
                性別
              </h2>
              <CustomRefinementList
                defaultRefinement={getDefaultRefinement()}
                attribute="gender"
              />
            </div>
          </div>
        </div>
      </InstantSearch>
    </main>
  );
};

export default Home;
