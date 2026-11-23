import React, { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Icon } from '../../../_components';
import { useFullScreenBrightness } from '../../../_hooks/useFullscreenBrightness';
import { announceStatus } from '../../../_utils';
import { TPassHolder } from '../../_models';
import UitpasCard from '../UitpasCard/UitpasCard';
import * as Styled from './style';

export type TCardModalPaging = {
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
};

type TCardModalProps = {
  icon?: string;
  isVisible: boolean;
  paging?: TCardModalPaging;
  passHolder: TPassHolder;
  toggleIsVisible: () => void;
};

const CardModal: FC<TCardModalProps> = ({ passHolder, icon, isVisible, paging, toggleIsVisible }) => {
  const { t } = useTranslation();
  const { resetScreen, brightenScreen } = useFullScreenBrightness();
  const previousIndexRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isVisible) {
      brightenScreen();
    } else {
      resetScreen();
    }
  }, [isVisible, brightenScreen, resetScreen]);

  useEffect(() => {
    if (!isVisible) {
      previousIndexRef.current = undefined;
      return;
    }
    if (!paging) return;

    const { currentIndex, total } = paging;
    if (previousIndexRef.current === undefined) {
      previousIndexRef.current = currentIndex;
      return;
    }
    if (previousIndexRef.current === currentIndex) return;

    previousIndexRef.current = currentIndex;
    announceStatus(
      t('PROFILE.CARD_MODAL.PAGE_ANNOUNCEMENT', {
        name: passHolder?.firstName,
        position: currentIndex + 1,
        total,
      }),
    );
  }, [isVisible, paging, passHolder?.firstName, t]);

  return (
    <Modal
      animationType="fade"
      onRequestClose={toggleIsVisible}
      presentationStyle="overFullScreen"
      transparent
      visible={isVisible}
    >
      {isVisible && <StatusBar style="light" />}
      <Styled.BlurContainer
        accessible={false}
        importantForAccessibility="no"
        onPress={toggleIsVisible}
        underlayColor="rgba(0, 0, 0, 0.85)"
      >
        <>
          <Styled.CloseButton accessibilityLabel={t('NAVIGATION.CLOSE')} accessibilityRole="button" onPress={toggleIsVisible}>
            <Icon accessible={false} color="neutral.0" name="Close" size={14} />
          </Styled.CloseButton>
          <UitpasCard icon={icon} isLarge passHolder={passHolder} />
          {paging && (
            <Styled.Pagination>
              <Styled.PaginationButton
                accessibilityLabel={t('PROFILE.CARD_MODAL.PREVIOUS')}
                accessibilityRole="button"
                hitSlop={8}
                onPress={paging.onPrevious}
              >
                <Icon color="primary.700" name="ChevronLeft" size={16} />
              </Styled.PaginationButton>
              <Styled.PaginationText
                accessibilityLabel={t('PROFILE.CARD_MODAL.PAGE', {
                  position: paging.currentIndex + 1,
                  total: paging.total,
                })}
                color="neutral.0"
                fontStyle="bold"
                size="xlarge"
              >
                {`${paging.currentIndex + 1} / ${paging.total}`}
              </Styled.PaginationText>
              <Styled.PaginationButton
                accessibilityLabel={t('PROFILE.CARD_MODAL.NEXT')}
                accessibilityRole="button"
                hitSlop={8}
                onPress={paging.onNext}
              >
                <Icon color="primary.700" name="ChevronRight" size={16} />
              </Styled.PaginationButton>
            </Styled.Pagination>
          )}
        </>
      </Styled.BlurContainer>
    </Modal>
  );
};

export default CardModal;
