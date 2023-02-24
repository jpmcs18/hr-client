import CustomReturn from '../../models/client-model/CustomReturn';

export default function CustomNumber({
  title,
  name,
  id,
  className,
  value,
  readonly,
  disabled,
  min,
  max,
  step,
  onChange,
}: {
  title: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (data: CustomReturn) => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <input
        disabled={disabled}
        readOnly={readonly}
        type='number'
        min={min}
        max={max}
        step={step}
        name={name}
        id={id}
        value={value ?? ''}
        onChange={(e) =>
          onChange?.({ elementName: name ?? '', value: e.target.valueAsNumber })
        }
      />
    </div>
  );
}
