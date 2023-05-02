import React, { useCallback, useMemo } from 'react'
import { Linking, Platform } from 'react-native';

import { Icon, SkeletonLoader, Typography } from '../../../_components';
import { getLanguage } from '../../../_utils/languageHelpers';
import { useGetOrganizer } from '../../_queries/useGetOrganizer';
import * as Styled from './style';

type TProps = {
  id: string,
  showTopBorder?: boolean
};

export const Organizer = ({ id, showTopBorder = false }: TProps) => {
  const { data, isLoading, isError } = useGetOrganizer({ id });

  const formattedAddress = useMemo(() => {
    // Fallback to nl, in case there is no translated address
    const address = data?.address[getLanguage()] || data?.address['nl'];
    if (!address) return '';

    let addressString = address.streetAddress;
    if (addressString.trim()) addressString += ', ';
    addressString += address.postalCode;
    addressString += ' ';
    addressString += address.addressLocality;
    return addressString.trim();
  }, [data?.address]);

  // TODO: check with JM if this can happen
  const name = useMemo(() => {
    // Fallback to nl, in case there is no translated address
    const name = typeof data?.name === 'string' ? data.name : data?.name[getLanguage()] || data?.name['nl'];
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

  if (isError) return null;

  return (
    <Styled.Container activeOpacity={0.8} disabled={isLoading} onPress={onPress} showTopBorder={showTopBorder}>
      <>
        <Styled.ImageContainer>
          <Icon color={'secondary.600'} name="Location" size={24} />
        </Styled.ImageContainer>
        <Styled.Content>
          {isLoading ? <>
            <SkeletonLoader layout={[{ height: 14, width: 200 }]} />
            <SkeletonLoader layout={[{ height: 14, width: 260 }]} />
          </> : <>
            <Typography size='small'>{name}</Typography>
            <Typography size='small'>{formattedAddress}</Typography>
          </>}
        </Styled.Content>
      </>
    </Styled.Container>
  )
}
