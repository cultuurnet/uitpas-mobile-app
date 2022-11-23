import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { format } from 'date-fns';

import { Icon, Typography } from '../_components';
import { THistoryItem } from './_models';
import * as Styled from './style';

type TProps = {
  data: THistoryItem;
};

const HistoryItem: FC<TProps> = ({ data: { points, location, creationDate } }) => {
  const { t } = useTranslation();
  const isNegative = points < 0;

  return (
    <Styled.HistoryItem>
      <Styled.HistoryIcon>
        <Icon color="blueGreen" name={isNegative ? 'Gift' : 'Point'} size={20} />
      </Styled.HistoryIcon>

      <View>
        <Typography fontStyle="bold" size="small">
          {t(`PROFILE.HISTORY.POINTS_${isNegative ? 'NEGATIVE' : 'POSITIVE'}`)}
        </Typography>
        <Typography size="xsmall">{location}</Typography>
      </View>

      <Styled.Points>
        <Typography color={isNegative ? 'red' : 'secondary'} fontStyle="bold" size="small">
          {t('PROFILE.HISTORY.POINTS', { points: isNegative ? points : `+${points}` })}
        </Typography>
        <Typography size="xsmall">{format(new Date(creationDate), 'dd/MM')}</Typography>
      </Styled.Points>
    </Styled.HistoryItem>
  );
};

export default HistoryItem;
