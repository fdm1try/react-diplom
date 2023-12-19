import { useState, useEffect } from 'react'

export interface ISearch {
  className: string;
  value?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
}

export const Search: React.FC<ISearch> = (props) => {
  const [value, setValue] = useState<string>(props.value || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit && props.onSubmit(value);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  }

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value])

  return (
    <form onSubmit={handleSubmit} className={`${props.className} form-inline`}>
      <input onChange={handleChange} className='form-control' value={value} placeholder='Поиск' />
    </form>
  )
}
