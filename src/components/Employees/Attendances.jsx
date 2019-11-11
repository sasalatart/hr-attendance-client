import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { Add as CreateIcon } from '@material-ui/icons';
import { useLoadResource, useSession } from '../../hooks';
import { loadAttendancesFromEmployee } from '../../store/ducks/attendances';
import { loadProfile } from '../../store/ducks/sessions';
import { getUserEntity, loadUser } from '../../store/ducks/users';
import AttendancesList from '../Attendances/List';
import AttendanceItemStamps from '../Attendances/List/Stamps';
import { DataPlaceholder, Title } from '../Common';

export default function EmployeeAttendances() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { employeeId } = useRouteMatch().params;
  const { currentUser, isEmployee } = useSession();

  const employee = useSelector(state =>
    getUserEntity(state, { userId: employeeId }),
  );

  const isSameUser = currentUser.id === employeeId;
  const loading = useLoadResource(
    useCallback(() => {
      return isSameUser
        ? dispatch(loadProfile())
        : dispatch(loadUser(employeeId));
    }, [dispatch, employeeId, isSameUser]),
    [isSameUser || !!employee],
  );

  const handleLoadAttendances = useCallback(
    page => dispatch(loadAttendancesFromEmployee(employeeId, page)),
    [dispatch, employeeId],
  );

  const title = isSameUser
    ? t('attendances.mine')
    : t('attendances.for', { name: employee && employee.fullname });

  const renderTitle = useCallback(
    setCreating => (
      <Title text={title} withBackButton>
        {!isEmployee && (
          <IconButton color="primary" onClick={setCreating}>
            <CreateIcon />
          </IconButton>
        )}
      </Title>
    ),
    [isEmployee, title],
  );

  const renderItemTextProps = useCallback(
    ({ enteredAt, leftAt, timezone }) => ({
      primary: (
        <AttendanceItemStamps
          enteredAt={enteredAt}
          leftAt={leftAt}
          timezone={timezone}
        />
      ),
    }),
    [],
  );

  return (
    <DataPlaceholder loading={loading} resource={employee}>
      <AttendancesList
        employeeId={employeeId}
        onLoadAttendances={handleLoadAttendances}
        renderItemTextProps={renderItemTextProps}
        renderTitle={renderTitle}
      />
    </DataPlaceholder>
  );
}
