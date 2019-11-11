import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loadAttendancesFromOrganization } from '../../../store/ducks/attendances';
import AttendancesList from '../../Attendances/List';
import AttendanceItemStamps from '../../Attendances/List/Stamps';
import { Title } from '../../Common';
import { organizationShape } from '../../prop-types';

export default function OrganizationAttendances({ organization }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLoadAttendances = useCallback(
    page => dispatch(loadAttendancesFromOrganization(organization.id, page)),
    [dispatch, organization.id],
  );

  const renderItemTextProps = useCallback(
    ({ employeeFullname, enteredAt, leftAt, timezone }) => ({
      primary: employeeFullname,
      secondary: (
        <AttendanceItemStamps
          enteredAt={enteredAt}
          leftAt={leftAt}
          timezone={timezone}
        />
      ),
    }),
    [],
  );

  const renderTitle = useCallback(
    () => (
      <Title
        text={t('attendances.for', { name: organization.name })}
        variant="h4"
      />
    ),
    [organization.name, t],
  );

  return (
    <AttendancesList
      onLoadAttendances={handleLoadAttendances}
      renderItemTextProps={renderItemTextProps}
      renderTitle={renderTitle}
    />
  );
}

OrganizationAttendances.propTypes = {
  organization: organizationShape.isRequired,
};
