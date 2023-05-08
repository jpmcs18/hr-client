import { useRef } from 'react';
import { toCommaSeparateAmount } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';

export default function CustomNumber({
  title,
  name,
  id,
  className,
  value,
  type,
  readonly,
  placeholder,
  disabled,
  onChange,
  onBlur,
}: {
  title?: string;
  name?: string;
  id?: string;
  className?: string;
  type: 'amount' | 'number';
  value?: string;
  placeholder?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  onBlur?: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  function formatCurrency(isBlur: boolean) {
    if (input.current === null) return;
    var inputValue = input.current.value;
    var length = inputValue.length;
    var selectionStart = input.current.selectionStart;
    var indexOfDecimal = inputValue.indexOf('.');
    if (indexOfDecimal >= 0) {
      var wholeNumber = inputValue.substring(0, indexOfDecimal);
      var decimalPoint = inputValue.substring(indexOfDecimal);
      wholeNumber = toCommaSeparateAmount(wholeNumber);
      decimalPoint = toCommaSeparateAmount(decimalPoint);
      if (isBlur) {
        decimalPoint += '00';
      }
      decimalPoint = decimalPoint.substring(0, 2);
      inputValue = wholeNumber + '.' + decimalPoint;
    } else {
      inputValue = toCommaSeparateAmount(inputValue);
      if (isBlur) {
        if (inputValue === '') inputValue = '0';
        inputValue += '.00';
      }
    }
    var newLength = inputValue.length;
    input.current.value = inputValue;
    selectionStart = newLength - length + (selectionStart ?? 0);
    input.current.setSelectionRange(selectionStart, selectionStart);
    onChange?.({ elementName: name ?? '', value: inputValue });
  }

  return (
    <div className={'custom-input ' + className}>
      {title && <label htmlFor={name}>{title}</label>}
      <input
        className='custom-number'
        disabled={disabled}
        readOnly={readonly}
        ref={input}
        placeholder={placeholder}
        type={type === 'amount' ? 'text' : 'number'}
        name={name}
        id={id}
        value={value ?? ''}
        onChange={(e) => {
          type === 'amount'
            ? formatCurrency(false)
            : onChange?.({
                elementName: name ?? '',
                value: e.target.valueAsNumber,
              });
        }}
        onBlur={() => {
          onBlur?.();
          if (type === 'amount') formatCurrency(true);
        }}
      />
    </div>
  );
}
