import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import compact from 'lodash/compact';
import { userShape } from '../../prop-types';

export default function UserListItem({ user, onRemoveClick, onEditClick }) {
  const handleGoToUser = useCallback(() => null, []);

  const handleEditClick = useCallback(() => onEditClick(user), [
    onEditClick,
    user,
  ]);

  const handleRemoveClick = useCallback(() => onRemoveClick(user), [
    onRemoveClick,
    user,
  ]);

  const fullName = compact([user.name, user.surname, user.secondSurname]).join(
    ' ',
  );

  return (
    <ListItem key={user.id} onClick={handleGoToUser} button>
      <ListItemText primary={fullName} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleRemoveClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

UserListItem.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  user: userShape.isRequired,
};
