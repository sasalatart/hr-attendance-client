import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { organizationShape } from '../../prop-types';

export default function OrganizationListItem({
  organization,
  onRemoveClick,
  onEditClick,
}) {
  const handleEditClick = useCallback(() => onEditClick(organization), [
    onEditClick,
    organization,
  ]);

  const handleRemoveClick = useCallback(() => onRemoveClick(organization), [
    onRemoveClick,
    organization,
  ]);

  return (
    <ListItem key={organization.id}>
      <ListItemText primary={organization.name} />
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

OrganizationListItem.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  organization: organizationShape.isRequired,
};
