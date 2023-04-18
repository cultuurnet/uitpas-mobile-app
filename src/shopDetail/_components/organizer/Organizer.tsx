import React, { useCallback, useMemo } from 'react'
import { Linking, Platform } from 'react-native';

import { Icon, Typography } from '../../../_components';
import { getLanguage } from '../../../_utils/languageHelpers';
import { useGetOrganizer } from '../../_queries/useGetOrganizer';
import * as Styled from './style';

type TProps = {
  id: string,
  showTopBorder?: boolean
};

export const Organizer = ({ id, showTopBorder = false }: TProps) => {
  const { data, isLoading } = useGetOrganizer({ id });

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
    const prefix = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const coordinatesString = `${data?.geo.latitude},${data?.geo.longitude}`;
    Linking.openURL(`${prefix}${coordinatesString}?q=${coordinatesString}`);
  }, [data?.geo]);

  // TODO: add correct loading state
  if (isLoading) return null;

  return (
    <Styled.Container activeOpacity={0.8} onPress={onPress} showTopBorder={showTopBorder}>
      <>
        <Styled.ImageContainer>
          <Icon color={'secondary.600'} name="Location" size={24} />
        </Styled.ImageContainer>
        <Styled.Content>
          <Typography size='small'>{name}</Typography>
          <Typography size='small'>{formattedAddress}</Typography>
        </Styled.Content>
      </>
    </Styled.Container>
  )
}
