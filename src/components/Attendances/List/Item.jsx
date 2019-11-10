import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { useSession } from '../../../hooks';
import { attendanceShape } from '../../prop-types';

export default function AttendanceListItem({
  attendance,
  onRemoveClick,
  onEditClick,
  renderItemTextProps,
}) {
  const { isEmployee } = useSession();

  const handleEditClick = useCallback(() => onEditClick(attendance), [
    onEditClick,
    attendance,
  ]);

  const handleRemoveClick = useCallback(() => onRemoveClick(attendance), [
    onRemoveClick,
    attendance,
  ]);

  return (
    <ListItem key={attendance.id} divider>
      <ListItemText {...renderItemTextProps(attendance)} />
      {!isEmployee && (
        <ListItemSecondaryAction>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleRemoveClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

AttendanceListItem.propTypes = {
  attendance: attendanceShape.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  renderItemTextProps: PropTypes.func.isRequired,
};
