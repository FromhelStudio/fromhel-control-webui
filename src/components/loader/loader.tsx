import './loader.scss'
import { useEffect } from "react";
import { LoaderCircle  } from 'lucide-react'

interface ILoaderProps {
  loading: boolean
}

export default function Loader({loading}: ILoaderProps) {
  useEffect(() => {
    if(loading){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading])

  return (
    <div className={loading ? 'loader-container-loading' : 'loader-container'}>
      <div className='loader' >
          <LoaderCircle className='loader-spinner' size={55} />
      </div>
    </div>
  )

}