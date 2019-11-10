import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '@material-ui/core';
import { usePaginatedCRUD } from '../../../hooks';
import {
  getAttendancesPaginationData,
  destroyAttendance,
} from '../../../store/ducks/attendances';
import {
  DataPlaceholder,
  PaginationControls,
  RemoveDialog,
} from '../../Common';
import AttendanceForm from '../Form';
import AttendanceListItem from './Item';

export default function AttendancesList({
  employeeId,
  onLoadAttendances,
  renderItemTextProps,
  renderTitle,
}) {
  const paginationData = useSelector(getAttendancesPaginationData);
  const { resources: attendances, paginationMeta } = paginationData;
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
    onLoadAttendances,
    useCallback(id => dispatch(destroyAttendance(id)), [dispatch]),
  );

  return (
    <>
      {renderTitle(setCreating)}
      <DataPlaceholder loading={loadingPage} resource={attendances}>
        {() => (
          <>
            <List>
              {attendances.map(attendance => (
                <AttendanceListItem
                  key={attendance.id}
                  onEditClick={setEditingResource}
                  onRemoveClick={setRemovingResource}
                  attendance={attendance}
                  renderItemTextProps={renderItemTextProps}
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
      <AttendanceForm employeeId={employeeId} {...dialogFormProps} />
      <RemoveDialog {...removeDialogProps} />
    </>
  );
}

AttendancesList.propTypes = {
  employeeId: PropTypes.string,
  onLoadAttendances: PropTypes.func.isRequired,
  renderItemTextProps: PropTypes.func.isRequired,
  renderTitle: PropTypes.func.isRequired,
};

AttendancesList.defaultProps = {
  employeeId: undefined,
};
