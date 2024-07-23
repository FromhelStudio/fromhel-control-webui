import './select.scss'

interface ISelectProps {
  options: string[]
  className?: string
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void
  value?: string
  validationForms?: any
}
export default function Select({options, value}: ISelectProps){

  return(
    <>
      <select className='select-component' value={value}>
        <option className='option' disabled>Seu Cargo</option>
        <hr/>
        {options.map((option) => (
          <option className='option' value={option}>{option}</option>
        ))}
        {/* Add options here */}
      </select>
    </>
  )
}