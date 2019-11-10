import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {
  DateRange as DateRangeIcon,
  PeopleOutline as PeopleOutlineIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@material-ui/icons';
import URI from 'urijs';
import {
  loadOrganization,
  getOrganizationEntity,
} from '../../../store/ducks/organizations';
import { roles } from '../../../constants';
import { useLoadResource, useSession } from '../../../hooks';
import { DataPlaceholder, Title } from '../../Common';
import UsersList from '../../Users/List';
import AttendancesList from './Attendances';

const tabs = {
  orgAdmins: 0,
  users: 1,
  attendances: 2,
};

export default function Organization() {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const { organizationId } = useRouteMatch().params;
  const { t } = useTranslation();
  const { isOrgAdmin } = useSession();
  const [currentTab, setCurrentTab] = useState(tabs.users);

  const organization = useSelector(state =>
    getOrganizationEntity(state, { organizationId }),
  );

  const loading = useLoadResource(
    useCallback(() => dispatch(loadOrganization(organizationId)), [
      dispatch,
      organizationId,
    ]),
    !!organization,
  );

  const handleTabChange = useCallback(
    (event, newTab) => {
      replace(
        URI(pathname)
          .removeQuery('page')
          .toString(),
      );
      setCurrentTab(newTab);
    },
    [pathname, replace],
  );

  return (
    <DataPlaceholder loading={loading} resource={organization}>
      {() => (
        <>
          <Title text={organization.name} withBackButton />
          <AppBar position="static" color="default">
            <Tabs
              aria-label={`${organization.name} tabs`}
              indicatorColor="primary"
              onChange={handleTabChange}
              textColor="primary"
              value={currentTab}
              centered
            >
              <Tab
                label={t('users.list.orgAdmins')}
                icon={<VerifiedUserIcon />}
              />
              <Tab
                label={t('users.list.employees')}
                icon={<PeopleOutlineIcon />}
              />
              {isOrgAdmin && (
                <Tab label={t('attendances.word')} icon={<DateRangeIcon />} />
              )}
            </Tabs>
          </AppBar>
          {currentTab === tabs.orgAdmins && (
            <UsersList role={roles.orgAdmin} organizationId={organizationId} />
          )}
          {currentTab === tabs.users && (
            <UsersList role={roles.employee} organizationId={organizationId} />
          )}
          {currentTab === tabs.attendances && (
            <AttendancesList organization={organization} />
          )}
        </>
      )}
    </DataPlaceholder>
  );
}
