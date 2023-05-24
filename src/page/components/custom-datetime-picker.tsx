import CustomReturn from '../../models/client-model/CustomReturn';
import { toDateDisplay, toTimeDisplay } from '../../helper';
import { useEffect, useRef } from 'react';
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
  const input = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (input.current) {
        input.current.value = !value
          ? ''
          : type === 'date'
          ? toDateDisplay(value)
          : toTimeDisplay(value);
      }
    },
    //eslint-disable-next-line
    [value]
  );

  function onBlur() {
    onChange?.({
      elementName: name ?? '',
      value: input.current?.valueAsDate,
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
          ref={input}
          className={type}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
