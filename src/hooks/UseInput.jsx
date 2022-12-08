import React , { useCallback, useState } from "react";

export function useInput( type, styles) {
    const [value, setValue] = useState('');
    const clearValue = useCallback(
      () => {
         setValue("")
      },
      [],
    )
    const input = <input type={type} className={`${styles} m-8 `} value={value} onChange={e => setValue(e.target.value)}  />;
    return [value,setValue,clearValue, input];
  }