export const getQueryParams = (query?: Record<string, unknown>): string => {
  return query
    ? Object.keys(query).reduce(
        (queryParams, key) => (query[key] ? `${queryParams}${queryParams.length ? '&' : '?'}${key}=${query[key]}` : queryParams),
        '',
      )
    : '';
};
