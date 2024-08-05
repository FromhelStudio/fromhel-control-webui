import {KeyboardEvent} from 'react'
import './input.scss'

interface Props {
  text?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  className?: string
  onChange?: (e: any) => void
  onEnter?: (val: string) => void
  validationForms?: any
}

/**
 * 
 * @param type - tipo do input
 * @param placeholder - placeholder do input
 * @param className - classe do input
 * @param validationForms - validação do input
 * @returns 
 */

export default function Input({ className, type, onEnter, placeholder, validationForms}: Props){
  function onEnterValue(keyboardUp: KeyboardEvent<HTMLInputElement>, key: string, func: (val: string) => void) {
    if (keyboardUp.key === key) {
      return func(keyboardUp.currentTarget.value)
    }
  }

  return(
    <>
    <div className={`input-component ${className}`}>
      <input 
        type={type} 
        onKey
        onKeyUp={(e) => onEnterValue(e, 'Enter', onEnter)}
        placeholder={placeholder} 
        {...validationForms}
      />
    
    </div>
    </>
  ) 
}