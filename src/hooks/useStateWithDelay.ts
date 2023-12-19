import { useRef, useState } from 'react'

export const useStateWithDelay = <T>(delay: number, initialValue?: T)
  : [T|undefined, (val: T, immediately?: boolean) => void ] => {
  const [value, setValue] = useState<T|undefined>(initialValue);
  const timerRef = useRef<number>();

  const changeValue = (newValue: T, immediately?: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (immediately) {
      setValue(newValue);
    } else {
      timerRef.current = setTimeout(() => setValue(newValue), delay);
    }
  }

  return [ value, changeValue ];
}
