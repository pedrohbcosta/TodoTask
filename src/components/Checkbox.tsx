import { useState } from "react";

export function Checkbox() {
  const [ checked, setChecked ] = useState(false)

  function toggle(){
    setChecked(!checked)
  }

  const checkedClass = checked ? 'checked' : '';
  const containerClass = 'checkbox'
  
  return (
    <div className="checkbox" onClick={toggle}></div>
  )
}