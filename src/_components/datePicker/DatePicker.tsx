import { ReactElement, useState } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import FakeTextInput from '../textInput/fakeTextInput/FakeTextInput';
import BlurredModal from '../blurredModal/BlurredModal';
import Button from '../button/Button';
import * as Styled from './style';

type TProps = {
  date?: Date;
  description?: string | ReactElement;
  isError?: boolean;
  label?: string | ReactElement;
  onSelectDate: (date: Date) => void;
};

const DatePicker = ({ date, onSelectDate, ...textInputProps }: TProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(date ?? new Date());

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setIsOpen(false);
      if (event.type === 'set' && selectedDate) {
        onSelectDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    onSelectDate(tempDate);
    handleClose();
  };

  return (
    <>
      <FakeTextInput {...textInputProps} onPress={handleOpen} value={date ? format(date, 'dd/MM/yyyy') : ''} />
      <BlurredModal isVisible={isOpen} toggleIsVisible={handleClose}>
        <Styled.ModalContent>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleChange}
            locale="nl"
          />
          {Platform.OS === 'ios' && (
            <Styled.ButtonContainer>
              <Button onPress={handleConfirm} label={t('DATE_PICKER.CONFIRM')} />
            </Styled.ButtonContainer>
          )}
        </Styled.ModalContent>
      </BlurredModal>
    </>
  );
};

export default DatePicker;
