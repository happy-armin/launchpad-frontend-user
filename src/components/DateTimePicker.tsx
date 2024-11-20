import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Default styling from library
import '../styles/components/date-time-picker.scss'; // Custom styling

interface DateTimePickerProps {
  onChange: (date: Date | null) => void;
  value: Date | null;
  id: string | null;
  disabled?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onChange, value, id, disabled }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div className={`date-time-picker ${disabled ? 'disabled' : ''}`}>
      <DatePicker
        id={!!id ? id : ''}
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        disabled={disabled}
        className="picker-input"
      />
    </div>
  );
};

export default DateTimePicker;
