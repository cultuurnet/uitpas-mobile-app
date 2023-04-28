import React from 'react'
import { useTranslation } from 'react-i18next';

import { Trans } from '../../../_components';
import { formatISOString } from '../../../_utils/dateHelpers';
import { TPeriod, TRedeemConstraint } from '../../../shop/_models/reward';
import { Section } from '../section/Section';

type TProps = {
  maxAvailableUnits?: number;
  redeemConstraint: TRedeemConstraint;
  redeemPeriod: TPeriod;
  unitsTaken?: number;
}

const MIN_AVAILABLE_UNITS = 10;

export const Availability = ({ redeemConstraint, redeemPeriod, unitsTaken, maxAvailableUnits }: TProps) => {
  const { t } = useTranslation();
  const unitsLeft = maxAvailableUnits ? maxAvailableUnits - unitsTaken : -1;
  const showUnits = unitsLeft > 0 && unitsLeft <= MIN_AVAILABLE_UNITS;

  const isVisible = !!redeemPeriod?.end || showUnits || !!redeemConstraint?.period;
  if (!isVisible) return null;

  return (
    <Section title={t('SHOP_DETAIL.AVAILABILITY')}>
      {!!redeemPeriod?.end && (
        <Trans
          i18nKey="SHOP_DETAIL.AVAILABILITY_DETAILS.REDEEM_UNTIL"
          size="small"
          values={{ date: formatISOString(redeemPeriod.end) }}
        />
      )}
      {showUnits && (
        <Trans
          i18nKey="SHOP_DETAIL.AVAILABILITY_DETAILS.UNITS_LEFT"
          size="small"
          values={{ units: unitsLeft }}
        />
      )}
      {!!redeemConstraint?.period && (
        <Trans
          i18nKey={redeemConstraint.period === 'ABSOLUTE' ? "SHOP_DETAIL.AVAILABILITY_DETAILS.CONSTRAINT_ABSOLUTE" : "SHOP_DETAIL.AVAILABILITY_DETAILS.CONSTRAINT"}
          size="small"
          values={{ period: t(`PERIODS.${redeemConstraint.period}`), volume: redeemConstraint.volume }}
        />
      )}
    </Section>
  )
}
