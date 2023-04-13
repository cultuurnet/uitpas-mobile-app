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

  const isVisible = !!redeemPeriod?.end || showTokens || !!redeemConstraint?.period;
  if (!isVisible) return null;

  return (
    <Section title={t('SHOP_DETAIL.AVAILABILITY')}>
      {!!redeemPeriod?.end && (
        <Trans
          i18nKey="SHOP_DETAIL.AVAILABILITY_DETAILS.REDEEM_UNTIL"
          values={{ date: formatISOString(redeemPeriod.end) }}
        />
      )}
      {showUnits && (
        <Trans
          i18nKey="SHOP_DETAIL.AVAILABILITY_DETAILS.UNITS_LEFT"
          values={{ units: unitsLeft }}
        />
      )}
      {!!redeemConstraint?.period && (
        <Trans
          i18nKey={redeemConstraint.period === 'ABSOLUTE' ? "SHOP_DETAIL.AVAILABILITY_DETAILS.CONSTRAINT_ABSOLUTE" : "SHOP_DETAIL.AVAILABILITY_DETAILS.CONSTRAINT"}
          values={{ period: t(`PERIODS.${redeemConstraint.period}`), volume: redeemConstraint.volume }}
        />
      )}
    </Section>
  )
}



// Beschikbaarheid

// Je kan dit voordeel nog omruilen tot {redeemPeriod.end}  Deze zin enkel tonen indien {redeemPeriod.end} in de respons zit (en niet enkel redeemPeriod.begin). De redeemperiod zal je ook nog in dag/maand/jaar moeten zetten.

// Nog {maxAvailableUnits}-{unitsTaken} beschikbaar. Deze zin enkel tonen indien maxAvailableUnits in respons zit (zoniet dan er geen limiet ingesteld) én indien  indien ({maxAvailableUnits}-{unitsTaken})  < 10 én > 0 want anders niet echt relevant om te tonen, dan zijn er nog genoeg.

// Je kan dit voordeel {redeemConstraint.volume} keer omruilen. Enkel tonen indien redeemConstraint.period = ABSOLUTE.

// Je kan dit voordeel {redeemConstraint.volume} keer omruilen per {redeemConstraint.period}. Enkel tonen indien redeemConstraint.period NIET absolute is. De engelse periods die je terugkrijgt zal je wel nog naar NL moeten omzetten (dag, week, maand, kwartaal, jaar)