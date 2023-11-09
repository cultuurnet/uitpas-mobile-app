import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RnDatePicker from 'react-native-date-picker';

import FakeTextInput from '../textInput/fakeTextInput/FakeTextInput';

type TProps = {
  date: Date;
  isError?: boolean;
  onSelectDate: (date: Date) => void;
};

const DatePicker = ({ date, isError, onSelectDate }: TProps) => {
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
      <FakeTextInput isError={isError} onPress={handleOpen} value={date.toLocaleDateString()} />
      <RnDatePicker
        cancelText={t('DATE_PICKER.CANCEL')}
        confirmText={t('DATE_PICKER.CONFIRM')}
        date={date}
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
