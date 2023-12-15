import { useEffect, useRef, useState } from 'react';

export interface ISearchForm {
  visible: boolean;
  onSubmit?: (value: string) => void;
}

export const SearchForm: React.FC<ISearchForm> = ({visible, onSubmit}) => {
  const refInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
 
  const formClassName = () => {
    let className = 'header-controls-search-form form-inline';
    if (!visible) className += ' invisible';
    return className;
  }

  useEffect(() => {
    if (visible) refInput.current?.focus();
  }, [visible])

  const handleInputChange = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setInputValue(e.target.value);
  }

  const handleFormSubmit = () => {
    onSubmit && onSubmit(inputValue);
  }

  return (
    <form onSubmit={handleFormSubmit} data-id='search-form' className={formClassName()}>
      <input onChange={handleInputChange} ref={refInput} className='form-control' placeholder='Поиск' value={inputValue} />
    </form>
  )
}
