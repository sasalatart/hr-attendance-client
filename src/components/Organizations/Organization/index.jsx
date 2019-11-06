import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {
  DateRange as DateRangeIcon,
  PeopleOutline as PeopleOutlineIcon,
} from '@material-ui/icons';
import {
  loadOrganization,
  getOrganizationEntity,
} from '../../../store/ducks/organizations';
import { DataPlaceholder, Title } from '../../Common';
import { useLoadResource } from '../../../hooks';

const tabs = {
  users: 0,
  attendances: 1,
};

export default function Organization() {
  const dispatch = useDispatch();
  const {
    params: { organizationId },
  } = useRouteMatch();
  const { t } = useTranslation();
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
    (event, newTab) => setCurrentTab(newTab),
    [],
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
              <Tab label={t('users.word')} icon={<PeopleOutlineIcon />} />
              <Tab label={t('attendances.word')} icon={<DateRangeIcon />} />
            </Tabs>
          </AppBar>
          {currentTab === tabs.users && t('users.word')}
          {currentTab === tabs.attendances && t('attendances.word')}
        </>
      )}
    </DataPlaceholder>
  );
}
