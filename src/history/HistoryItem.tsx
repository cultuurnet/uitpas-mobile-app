import { FC } from 'react';
import { format } from 'date-fns';

import { Icon, Typography } from '../_components';
import i18n from '../_translations/i18n';
import { THistoryItem } from './_models';
import * as Styled from './style';

type TProps = {
  data: THistoryItem;
};

const HistoryItem: FC<TProps> = ({ data: { points, location, creationDate, title } }) => {
  const isNegative = points < 0;
  return (
    <Styled.HistoryItem>
      <Styled.HistoryIcon>
        <Icon color="primary.500" name={isNegative ? 'Gift' : 'Point'} size={20} />
      </Styled.HistoryIcon>

      <Styled.InfoView>
        <Typography fontStyle="bold" size="small">
          {i18n.t(`PROFILE.HISTORY.POINTS_TITLE`, {
            title,
          })}
        </Typography>
        <Typography size="xsmall">{location}</Typography>
      </Styled.InfoView>

      <Styled.Points>
        <Typography color={isNegative ? 'error.600' : 'secondary.600'} fontStyle="bold" size="small">
          {i18n.t(`PROFILE.HISTORY.POINT${points > 1 ? 'S' : ''}`, { points: isNegative ? points : `+${points}` })}
        </Typography>
        <Typography size="xsmall">{format(new Date(creationDate), 'dd/MM')}</Typography>
      </Styled.Points>
    </Styled.HistoryItem>
  );
};

export default HistoryItem;
