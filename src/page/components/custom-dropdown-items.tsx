import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import CustomReturn from '../../models/client-model/CustomReturn';
import { DropdownItem } from './custom-dropdown';

export default function CustomDropdownItems({
  id,
  name,
  value,
  onChange,
  itemsList,
}: {
  id: string;
  name?: string;
  value?: any;
  onChange?: (data: CustomReturn) => void;
  itemsList: DropdownItem[];
}) {
  const [filter, setFilter] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(
    () => {
      setItemsLocation();
    },
    //eslint-disable-next-line
    []
  );

  function setItemsLocation() {
    if (divRef.current?.style) {
      const parent = document.getElementById(id);
      const { x, y, width, height, top, right, bottom, left } =
        parent?.getBoundingClientRect() as DOMRect;
      divRef.current.style.top = `${bottom + 2}px`;
      divRef.current.style.left = `${left}px`;
      divRef.current.style.width = `${width}px`;
      console.log();
    }
  }
  return ReactDOM.createPortal(
    <div className='selection' ref={divRef}>
      <div>
        <input
          className='search-input'
          type='text'
          value={filter}
          placeholder='Search...'
          autoComplete='off'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className='selection-list'>
        {itemsList
          .filter((x) => x.value?.toLowerCase()?.includes(filter.toLowerCase()))
          .map((item) => (
            <div
              className={
                'selection-item ' +
                (item.key?.toString() === value?.toString() ? 'selected' : '')
              }
              key={item.key}
              onClick={() => {
                onChange?.({
                  elementName: name ?? 'def',
                  value: item.key,
                });
              }}>
              {item.value}
            </div>
          ))}
      </div>
    </div>,
    document.getElementById('select') as HTMLElement
  );
}
