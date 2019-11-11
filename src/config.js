export default {
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  },
  defaultTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
