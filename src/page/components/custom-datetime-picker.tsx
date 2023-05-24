import CustomReturn from '../../models/client-model/CustomReturn';
import { toDateDisplay, toTimeDisplay } from '../../helper';
import { useRef } from 'react';
type DateTimePickerType = 'date' | 'time' | 'datetime-local';
export default function CustomDateTimePicker({
  title,
  name,
  type,
  id,
  className,
  value,
  readonly,
  placeholder,
  disabled,
  onChange,
}: {
  title?: string;
  name?: string;
  type?: DateTimePickerType;
  id?: string;
  className?: string;
  value?: Date;
  placeholder?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
}) {
  const date = useRef<string | undefined>(
    value === undefined || value === null
      ? undefined
      : type === 'date'
      ? toDateDisplay(value)
      : toTimeDisplay(value)
  );

  function onBlur() {
    onChange?.({
      elementName: name ?? '',
      value: date === undefined ? undefined : new Date(date.current!),
    });
  }
  return (
    <div className={'custom-input ' + className}>
      {title && <label htmlFor={name}>{title}</label>}
      <div className='input-container'>
        <input
          disabled={disabled}
          readOnly={readonly}
          type={type ?? 'time'}
          name={name}
          placeholder={placeholder}
          id={id}
          value={date.current}
          className={type}
          onChange={(e) => {
            date.current = e.target.value;
          }}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
