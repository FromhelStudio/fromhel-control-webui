import './input.scss'

interface Props {
  text?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  className?: string
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

export default function Input({ className, type, placeholder, validationForms}: Props){
  return(
    <>
    <div className={`input-component ${className}`}>
      <input 
        type={type} 
        onKey
        placeholder={placeholder} 
        {...validationForms}
      />
    
    </div>
    </>
  ) 
}