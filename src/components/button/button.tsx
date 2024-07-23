import { MouseEvent } from 'react';
import './button.scss'
interface IButtonProps {
  text?: string | null;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent) => any | void
  isDisabled?: boolean
}

/**
 * @params text - texto do butão
 * @params onClick - função de clicar no butão
 * @params type - tipo desse maravilhoso butão
 * @params isDisabled - pai ta off
 * @returns
*/

export default function Button({text, isDisabled = undefined, onClick, type}: IButtonProps){
  return(
    <button 
    className={`button-component`} 
    type={type}
    onClick={onClick}   
    disabled={isDisabled}>
      {text}
    </button>
  )
}