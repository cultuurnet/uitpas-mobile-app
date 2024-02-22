import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform } from 'react-native';

import { Icon, SkeletonLoader, Typography } from '../../../_components';
import { getLanguage } from '../../../_utils';
import { useGetOrganizer } from '../../_queries/useGetOrganizer';
import * as Styled from './style';

type TProps = {
  fallbackName?: string;
  id: string;
  showTopBorder?: boolean;
};

export const Organizer = ({ id, fallbackName, showTopBorder = false }: TProps) => {
  const { data, isLoading, isError } = useGetOrganizer({ id });
  const { t } = useTranslation();

  const formattedAddress = useMemo(() => {
    // Fallback to nl, in case there is no translated address
    const address = data?.address[getLanguage()] || data?.address.nl;
    if (!address) return '';

    let addressString = address.streetAddress;
    if (addressString.trim()) addressString += ', ';
    addressString += address.postalCode;
    addressString += ' ';
    addressString += address.addressLocality;
    return addressString.trim();
  }, [data?.address]);

  const name = useMemo(() => {
    // Fallback to nl, in case there is no translated address
    const name = typeof data?.name === 'string' ? data.name : data?.name[getLanguage()] || data?.name.nl;
    return name;
  }, [data?.name]);

  const onPress = useCallback(() => {
    let url = '';
    if (Platform.OS === 'ios') {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;
    } else {
      const coordinatesString = `${data?.geo.latitude},${data?.geo.longitude}`;
      const prefix = 'geo:';
      url = `${prefix}${coordinatesString}?q=${encodeURIComponent(formattedAddress)}`;
    }
    Linking.openURL(url);
  }, [formattedAddress, data?.geo]);

  return (
    <Styled.Container activeOpacity={0.8} disabled={isLoading || isError} onPress={onPress} showTopBorder={showTopBorder}>
      <>
        <Styled.ImageContainer>
          <Icon color={'secondary.600'} name="Location" size={24} />
        </Styled.ImageContainer>
        <Styled.Content>
          {isLoading ? (
            <>
              <SkeletonLoader layout={[{ height: 14, key: `organizer-${id}-text-1`, width: 200 }]} />
              <SkeletonLoader layout={[{ height: 14, key: `organizer-${id}-text-2`, width: 260 }]} />
            </>
          ) : (
            <>
              <Typography size="small">{name || fallbackName}</Typography>
              <Typography color={isError ? 'neutral.300' : 'neutral.900'} size="small">
                {isError ? t('ERROR.ORGANIZER_ADDRESS') : formattedAddress}
              </Typography>
            </>
          )}
        </Styled.Content>
      </>
    </Styled.Container>
  );
};
