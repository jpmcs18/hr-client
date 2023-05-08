import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Guid } from 'guid-typescript';
import { useState } from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';

export interface DropdownItem {
  key: string | undefined;
  value: string | undefined;
}
export default function CustomDropdown({
  title,
  name,
  id,
  className,
  value,
  itemsList,
  readonly,
  onChange,
}: {
  title: string;
  name?: string;
  id?: string;
  className?: string;
  value?: any;
  itemsList: DropdownItem[];
  readonly?: boolean | false;
  onChange?: (data: CustomReturn) => void;
}) {
  const [filter, setFilter] = useState('');
  const componentId = Guid.create().toString();
  function openSelection() {
    document.getElementById(componentId)?.classList.remove('selection-show');
    document.getElementById(componentId)?.classList.add('selection-show');
  }
  return (
    <div className={'custom-input ' + className} id={id}>
      <label>{title}</label>
      <div className='select-container'>
        <div
          className='select-input-container input-container'
          onFocus={() => openSelection()}
          onClick={() => openSelection()}>
          <input
            type='text'
            className='selection-input'
            readOnly={true}
            value={
              itemsList.filter(
                (x) => x.key?.toString() === value?.toString()
              )?.[0]?.value ?? ''
            }
            id={componentId + '-input'}
          />
          <div className='icon-container'>
            <FontAwesomeIcon
              icon={faChevronDown}
              className='icon'
              id={componentId + '-icon'}
            />
          </div>
        </div>
        {!readonly && (
          <div className='selection' id={componentId}>
            <div>
              <input
                className='search-input'
                type='text'
                value={filter}
                placeholder='Search...'
                autoComplete='off'
                id={componentId + '-search'}
                onFocus={() => openSelection()}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className='selection-list'>
              {itemsList
                .filter((x) =>
                  x.value?.toLowerCase()?.includes(filter.toLowerCase())
                )
                .map((item) => (
                  <div
                    className={
                      'selection-item ' +
                      (item.key?.toString() === value?.toString()
                        ? 'selected'
                        : '')
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
          </div>
        )}
      </div>
    </div>
  );
}
