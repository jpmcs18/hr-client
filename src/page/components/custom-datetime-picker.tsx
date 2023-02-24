import CustomReturn from '../../models/client-model/CustomReturn';
import { toDateDisplay, toTimeDisplay } from '../../helper';
type DateTimePickerType = 'date' | 'time' | 'datetime-local';
export default function CustomDateTimePicker({
  title,
  name,
  type,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
}: {
  title: string;
  name?: string;
  type?: DateTimePickerType;
  id?: string;
  className?: string;
  value?: Date;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <div className='input-container'>
        <input
          disabled={disabled}
          readOnly={readonly}
          type={type ?? 'time'}
          name={name}
          id={id}
          value={
            !value
              ? undefined
              : type === 'date'
              ? toDateDisplay(value)
              : toTimeDisplay(value)
          }
          className={type}
          onChange={(e) =>
            onChange?.({ elementName: name ?? '', value: e.target.valueAsDate })
          }
        />
      </div>
    </div>
  );
}
