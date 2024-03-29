import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RnDatePicker from 'react-native-date-picker';
import { format } from 'date-fns';

import FakeTextInput from '../textInput/fakeTextInput/FakeTextInput';

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
      <FakeTextInput {...textInputProps} onPress={handleOpen} value={date ? format(date, 'dd/MM/yyyy') : ''} />
      <RnDatePicker
        cancelText={t('DATE_PICKER.CANCEL')}
        confirmText={t('DATE_PICKER.CONFIRM')}
        date={date ?? new Date()}
        locale="nl"
        modal
        mode="date"
        onCancel={handleClose}
        onConfirm={handleConfirm}
        open={isOpen}
        title={null}
      />
    </>
  );
};

export default DatePicker;
