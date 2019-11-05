import { useCallback } from 'react';
import usePagination from './usePagination';
import useResourceManager from './useResourceManager';

export default function usePaginatedCRUD(
  paginationData,
  onLoad,
  onDestroy,
  { onGoToCreatedResource } = {},
) {
  const {
    handleLoadPage,
    handleRefreshPagination,
    handleSetPage,
    loadingPage,
  } = usePagination(paginationData, onLoad);

  const {
    state: {
      creating,
      editing: resourceBeingEdited,
      removing: resourceBeingRemoved,
    },
    resetManager,
    setCreating,
    setEditingResource,
    setRemovingResource,
  } = useResourceManager();

  const handleResourceCreated = useCallback(
    resource => {
      resetManager();
      return onGoToCreatedResource
        ? setTimeout(() => onGoToCreatedResource(resource), 1)
        : handleRefreshPagination();
    },
    [handleRefreshPagination, onGoToCreatedResource, resetManager],
  );

  const { paginationMeta } = paginationData;
  const handleDestroy = useCallback(
    async id => {
      await onDestroy(id);
      const { total, page, pageSize } = paginationMeta;
      const previousPage = page - 1;
      return page > 1 && total - 1 === previousPage * pageSize
        ? handleSetPage(previousPage)
        : handleLoadPage(page);
    },
    [handleLoadPage, handleSetPage, onDestroy, paginationMeta],
  );

  return {
    handleSetPage,
    loadingPage,
    setCreating,
    setEditingResource,
    setRemovingResource,
    dialogFormProps: {
      resource: resourceBeingEdited,
      onClose: resetManager,
      onCreated: handleResourceCreated,
      visible: !!(creating || resourceBeingEdited),
    },
    removeDialogProps: {
      onClose: resetManager,
      onDestroy: handleDestroy,
      resource: resourceBeingRemoved,
      visible: !!resourceBeingRemoved,
    },
  };
}
