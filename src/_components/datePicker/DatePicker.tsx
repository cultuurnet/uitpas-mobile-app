import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import BlurredModal from '../blurredModal/BlurredModal';
import Button from '../button/Button';
import FakeTextInput from '../textInput/fakeTextInput/FakeTextInput';
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

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
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
      {Platform.OS === 'ios' ? (
        <BlurredModal isVisible={isOpen} toggleIsVisible={handleClose}>
          <Styled.ModalContent>
            <DateTimePicker display="inline" mode="date" onChange={handleChange} value={tempDate} />
            <Styled.ButtonContainer>
              <Button label={t('DATE_PICKER.CONFIRM')} onPress={handleConfirm} />
            </Styled.ButtonContainer>
          </Styled.ModalContent>
        </BlurredModal>
      ) : (
        isOpen && <DateTimePicker display="default" mode="date" onChange={handleChange} value={tempDate} />
      )}
    </>
  );
};

export default DatePicker;
