export const setupPolyfills = () => {
  // https://stackoverflow.com/a/70114114
  Promise.allSettled =
    Promise.allSettled ||
    (promises =>
      Promise.all(
        promises.map(p =>
          p
            .then(value => ({
              status: 'fulfilled',
              value,
            }))
            .catch(reason => ({
              reason,
              status: 'rejected',
            })),
        ),
      ));
};
