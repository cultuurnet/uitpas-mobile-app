import { Linking } from 'react-native';

import { log } from './logger';

export async function openExternalURL(href: string) {
  const supported = await Linking.canOpenURL(href);

  if (supported) {
    await Linking.openURL(href);
  } else {
    // eslint-disable-next-line no-console
    log.warn(`Failed to open external link: '${href}'`);
  }
}
