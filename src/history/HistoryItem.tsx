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
  const { t } = useTranslation();
  const isNegative = points < 0;

  return (
    <Styled.HistoryItem>
      <Styled.HistoryIcon>
        <Icon color="blueGreen" name={isNegative ? 'Gift' : 'Point'} size={20} />
      </Styled.HistoryIcon>

      <Styled.InfoView>
        <Typography fontStyle="bold" size="small">
          {t(`PROFILE.HISTORY.POINTS_TITLE`, {
            title,
          })}
        </Typography>
        <Typography size="xsmall">{location}</Typography>
      </Styled.InfoView>

      <Styled.Points>
        <Typography color={isNegative ? 'red' : 'secondary'} fontStyle="bold" size="small">
          {t(`PROFILE.HISTORY.${points > 1 ? 'POINTS' : 'POINT'}`, { points: isNegative ? points : `+${points}` })}
        </Typography>
        <Typography size="xsmall">{format(new Date(creationDate), 'dd/MM')}</Typography>
      </Styled.Points>
    </Styled.HistoryItem>
  );
};

export default HistoryItem;
