import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import {
  DateRange as DateRangeIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import compact from 'lodash/compact';
import { useSession } from '../../../hooks';
import { userShape } from '../../prop-types';
import { compiledRoutes } from '../../../routes';
import { roles } from '../../../constants';

export default function UserListItem({ user, onRemoveClick, onEditClick }) {
  const { isOrgAdmin } = useSession();
  const { push } = useHistory();

  const handleGoToUserClick = useCallback(
    () => push(compiledRoutes.employeesAttendances({ employeeId: user.id })),
    [push, user.id],
  );

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
    <ListItem key={user.id}>
      <ListItemText primary={fullName} />
      <ListItemSecondaryAction>
        {isOrgAdmin && user.role === roles.employee && (
          <IconButton onClick={handleGoToUserClick}>
            <DateRangeIcon />
          </IconButton>
        )}
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
