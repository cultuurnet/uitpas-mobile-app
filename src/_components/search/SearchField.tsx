import React, { FC, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useDebounce } from '../../_hooks';
import { FillMetadataQueryFunction, HttpMetadataQuery } from '../../_http';
import { Icon } from '../icon/Icon';
import InputField from '../input/inputField/InputField';

import { styles } from './SearchField.styles';

type TProps = {
  query?: HttpMetadataQuery;
  setQuery: FillMetadataQueryFunction;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};

function shouldSearch(currentQuery: HttpMetadataQuery, searchString: string): boolean {
  if (currentQuery?.search === searchString) return false;
  if (!currentQuery?.search && !searchString) return false;
  return true;
}

export const SearchField: FC<TProps> = ({ query, setQuery, style, wrapperStyle }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (shouldSearch(query, debouncedSearch)) {
      setQuery({ search: search, skip: 0 });
    }
  }, [debouncedSearch, query, setQuery]);

  return (
    <InputField
      icon={
        <Icon
          buttonStyle={styles.icon}
          color="primary"
          name={search ? 'Close' : 'Search'}
          onPress={() => setSearch('')}
          size={'small'}
        />
      }
      labelIcon="ArrowLeft"
      name="search"
      onChange={(value: string) => setSearch(value)}
      placeholder="Search user"
      style={[styles.searchField, style]}
      value={search}
      wrapperStyle={wrapperStyle}
    />
  );
};
