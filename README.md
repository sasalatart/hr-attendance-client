# HR Attendance Client

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa58412b-d766-42ee-8fce-6f593b9aedcd/deploy-status)](https://app.netlify.com/sites/hr-attendance/deploys)
[![CircleCI](https://circleci.com/gh/sasalatart/hr-attendance-client.svg?style=svg&circle-token=b1d08a763d2488c08c8fdbbded58da44cfec30a9)](https://circleci.com/gh/sasalatart/hr-attendance-client)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## About

Client app built with React & Redux for the Runa HR assignment.

The API may be found [in this repo](https://github.com/sasalatart/hr-attendance-api).

Check out the
[OpenAPI Spec Documentation](https://app.swaggerhub.com/apis-docs/sasalatart/hr-attendance/1.0.0)
for more information about the endpoints consumed.

## Assumptions

- All users (except admins) belong to an organization, as the app was designed to work with multiple
  organizations/companies.
- There are three roles: `admins`, `org_admins`, and `employees`:

  - `admins`: May manage organizations, and manage org admins and employees within them. They are
    the "seed users" of the platform.
  - `org_admins`: May create more org admins and employees for their organizations (and manage them),
    as well as read and manage employee attendances. These users do not check in nor check out (they
    do not have their own attendances).
  - `employees`: These may check in & check out their attendances, as well as see their own past
    attendances.

- **There is no signup**. All users must be created by either an `org admin` (if the user will
  exist within the same organization), or by a platform `admin`. The application always assumes
  there is at least one `admin` who is able to start adding users to the app, who will in turn keep
  on adding others. This is done so as to prevent external people from creating an account within an
  organization they do not belong to.
- Authentication is done via short-lived JWTs (with a lifespan of 2 hours).
- Users have a timezone assigned to them, which may be updated. These timezones are also stored in
  each of their attendances as they are registered (checkin & checkout). This way attendances
  fetched have enough context to be read according to where each employee is geographically located,
  and thus their timestamps may be read correctly and not relative to where the user fetching the
  information is. This allows for multinational/remote organizations to use the application, where
  they span over different timezones, and read checkin & checkout times relative to where they were
  actually done.

## Technologies and Services Used

- React
- Redux
- CircleCI
- Netlify (Deployment)

## Development Setup

1. Clone and cd into this repository.
2. Run `yarn install` to install npm dependencies.
3. Make sure to have the [API](https://github.com/sasalatart/hr-attendance-api) running on port 3000.
4. Run `yarn start` to run the application on port 3001.

## Linter

You may run [eslint](https://eslint.org/) by executing:

```sh
$ yarn lint
```
