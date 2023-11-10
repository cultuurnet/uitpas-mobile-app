import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RnDatePicker from 'react-native-date-picker';

import FakeTextInput from '../textInput/fakeTextInput/FakeTextInput';
import { format } from 'date-fns';

type TProps = {
  date: Date;
  description?: string | ReactElement;
  isError?: boolean;
  label?: string | ReactElement;
  onSelectDate: (date: Date) => void;
};

const DatePicker = ({ date, onSelectDate, ...textInputProps }: TProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = (nextDate: Date) => {
    onSelectDate(nextDate);
    handleClose();
  };

  return (
    <>
      <FakeTextInput {...textInputProps} onPress={handleOpen} value={format(date, 'dd/MM/yyyy')} />
      <RnDatePicker
        cancelText={t('DATE_PICKER.CANCEL')}
        confirmText={t('DATE_PICKER.CONFIRM')}
        date={date ?? new Date()}
        modal
        mode="date"
        onCancel={handleClose}
        onConfirm={handleConfirm}
        open={isOpen}
      />
    </>
  );
};

export default DatePicker;
