import React from 'react';

export default function CustomCheckBox({
  isChecked,
  checkChange,
  id,
  text,
}: {
  checkChange: () => void;
  isChecked: boolean;
  id?: string;
  text?: string;
}) {
  return (
    <div className='check'>
      <label className='check-container'>
        <input
          type='checkbox'
          id={id ?? 'check'}
          onChange={checkChange}
          checked={isChecked}
        />
        <span className='checkmark'></span>
      </label>
      {text && (
        <label className='check-label' htmlFor={id ?? 'check'}>
          {text}
        </label>
      )}
    </div>
  );
}
