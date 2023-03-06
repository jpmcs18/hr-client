import CustomReturn from '../../models/client-model/CustomReturn';
export default function CustomTextArea({
  title,
  name,
  lines,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
}: {
  title: string;
  name?: string;
  lines?: number;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <textarea
        disabled={disabled}
        readOnly={readonly}
        name={name}
        id={id}
        rows={lines ?? 2}
        value={value ?? ''}
        onChange={(e) =>
          onChange?.({ elementName: name ?? '', value: e.target.value })
        }
      />
    </div>
  );
}
