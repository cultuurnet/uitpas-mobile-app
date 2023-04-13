import React, { useCallback, useMemo } from 'react'
import { Linking, Platform } from 'react-native';

import { Icon, Typography } from '../../../_components';
import { StorageKey } from '../../../_models';
import { storage } from '../../../storage';
import { useGetOrganizer } from '../../_queries/useGetOrganizer';
import * as Styled from './style';

export const Organizer = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetOrganizer({ id });

  const formattedAddress = useMemo(() => {
    const lang = storage.getString(StorageKey.Language);
    // Fallback to nl, in case there is no translated address
    const address = data?.address[lang] || data?.address['nl'];
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
    const lang = storage.getString(StorageKey.Language);
    // Fallback to nl, in case there is no translated address
    const name = typeof data?.name === 'string' ? data.name : data?.name[lang] || data?.name['nl'];
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
    <Styled.Container activeOpacity={0.8} onPress={onPress}>
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
