import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, List } from '@material-ui/core';
import { Add as CreateIcon } from '@material-ui/icons';
import { usePaginatedCRUD } from '../../../hooks';
import {
  loadUsers,
  destroyUser,
  getUsersPaginationData,
} from '../../../store/ducks/users';
import {
  DataPlaceholder,
  PaginationControls,
  RemoveDialog,
  Title,
} from '../../Common';
import { roleShape } from '../../prop-types';
import UserForm from '../Form';
import UserListItem from './Item';

export default function UsersList({ role, organizationId }) {
  const paginationData = useSelector(getUsersPaginationData);
  const { resources: users, paginationMeta } = paginationData;
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
    useCallback(page => dispatch(loadUsers(organizationId, role, page)), [
      organizationId,
      role,
      dispatch,
    ]),
    useCallback(id => dispatch(destroyUser(id)), [dispatch]),
  );

  return (
    <>
      <DataPlaceholder loading={loadingPage} resource={users}>
        {() => (
          <>
            <Title textId={`users.list.${role}s`} variant="h4">
              <IconButton color="primary" onClick={setCreating}>
                <CreateIcon />
              </IconButton>
            </Title>
            <List>
              {users.map(user => (
                <UserListItem
                  key={user.id}
                  onEditClick={setEditingResource}
                  onRemoveClick={setRemovingResource}
                  user={user}
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
      <UserForm
        role={role}
        organizationId={organizationId}
        {...dialogFormProps}
      />
      <RemoveDialog {...removeDialogProps} />
    </>
  );
}

UsersList.propTypes = {
  organizationId: PropTypes.string.isRequired,
  role: roleShape.isRequired,
};
