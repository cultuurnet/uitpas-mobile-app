import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { Icon, Typography } from '../_components';
import { THistoryItem } from './_models';
import * as Styled from './style';

type TProps = {
  data: THistoryItem;
};

const HistoryItem: FC<TProps> = ({ data: { points, location, creationDate, title } }) => {
  const isNegative = points < 0;
  const { t } = useTranslation();
  return (
    <Styled.HistoryItem>
      <Styled.HistoryIcon>
        <Icon color="primary.500" name={isNegative ? 'Gift' : 'Point'} size={20} />
      </Styled.HistoryIcon>

      <Styled.InfoView>
        <Typography fontStyle="bold" size="small">
          {t(`PROFILE.HISTORY.POINTS_TITLE`, {
            title: title,
          })}
        </Typography>
        <Typography size="xsmall">{location}</Typography>
      </Styled.InfoView>

      <Styled.Points>
        <Typography color={isNegative ? 'error.600' : 'secondary.600'} fontStyle="bold" size="small">
          {t('PROFILE.HISTORY.POINTS', { points: isNegative ? points : `+${points}` })}
        </Typography>
        <Typography size="xsmall">{format(new Date(creationDate), 'dd/MM')}</Typography>
      </Styled.Points>
    </Styled.HistoryItem>
  );
};

export default HistoryItem;
