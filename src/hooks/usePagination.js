import { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import URI from 'urijs';
import isEmpty from 'lodash/isEmpty';
import useLoadResource from './useLoadResource';

export default function usePagination({ paginationMeta, resources }, loadPage) {
  const { replace } = useHistory();
  const { pathname, search } = useLocation();
  const currentPage = paginationMeta.page;

  const [fetchingPage, setFetchingPage] = useState(false);

  const handleLoadPage = useCallback(
    async page => {
      setFetchingPage(true);
      await loadPage(page);
      setFetchingPage(false);
    },
    [loadPage],
  );

  const handleSetPage = useCallback(
    page => {
      replace(
        URI(pathname)
          .setQuery({ ...URI.parseQuery(search), page })
          .toString(),
      );
    },
    [pathname, replace, search],
  );

  const handleRefreshPagination = useCallback(() => {
    return +currentPage !== 1 ? handleSetPage(1) : handleLoadPage(1);
  }, [currentPage, handleSetPage, handleLoadPage]);

  useLoadResource(
    useCallback(() => handleLoadPage(currentPage), [
      currentPage,
      handleLoadPage,
    ]),
  );

  return {
    fetchingPage,
    handleLoadPage,
    handleRefreshPagination,
    handleSetPage,
    loadingPage: fetchingPage && isEmpty(resources),
  };
}
