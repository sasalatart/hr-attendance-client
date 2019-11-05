import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, List } from '@material-ui/core';
import { Add as CreateIcon } from '@material-ui/icons';
import { usePaginatedCRUD } from '../../../hooks';
import {
  loadOrganizations,
  destroyOrganization,
  getOrganizationsPaginationData,
} from '../../../store/ducks/organizations';
import {
  DataPlaceholder,
  PaginationControls,
  RemoveDialog,
  Title,
} from '../../Common';
import OgranizationForm from '../Form';
import OrganizationListItem from './Item';

export default function OrganizationsList() {
  const paginationData = useSelector(getOrganizationsPaginationData);
  const { resources: organizations, paginationMeta } = paginationData;
  const dispatch = useDispatch();

  const {
    dialogFormProps,
    handleSetPage,
    loadingPage,
    removeDialogProps,
    setCreating,
    setEditingResource,
    setRemovingResource,
  } = usePaginatedCRUD(
    paginationData,
    useCallback(page => dispatch(loadOrganizations(page)), [dispatch]),
    useCallback(id => dispatch(destroyOrganization(id)), [dispatch]),
  );

  return (
    <>
      <DataPlaceholder loading={loadingPage} resource={organizations}>
        {() => (
          <>
            <Title textId="organizations.word">
              <IconButton color="primary" onClick={setCreating}>
                <CreateIcon />
              </IconButton>
            </Title>
            <List>
              {organizations.map(organization => (
                <OrganizationListItem
                  key={organization.id}
                  onEditClick={setEditingResource}
                  onRemoveClick={setRemovingResource}
                  organization={organization}
                />
              ))}
            </List>
            <PaginationControls
              onSetPage={handleSetPage}
              paginationMeta={paginationMeta}
            />
          </>
        )}
      </DataPlaceholder>
      <OgranizationForm {...dialogFormProps} />
      <RemoveDialog {...removeDialogProps} />
    </>
  );
}
