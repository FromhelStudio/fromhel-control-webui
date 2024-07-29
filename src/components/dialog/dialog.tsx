import './dialog.scss'
import {ReactNode} from 'react'
import { X } from 'lucide-react'


interface IDialogProps {
  title: string;
  children: ReactNode;
}

export default function Dialog({title, children}: IDialogProps){
  return(
    <>
        <div className="dialog-container">
          <div className="dialog-card">
            <div className='dialog-header'>
              <h1>{title}</h1>
              <X className='dialog-close' size={20} />
            </div>
            <div className='dialog-content'>
              <div className='dialog-body'>
                  <p>{children}</p>
              </div>
            </div>
          </div>
        <div className='dialog-overlay'></div>
        </div>
    </>
  )
}