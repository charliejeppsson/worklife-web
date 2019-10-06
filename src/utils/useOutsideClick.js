import { useEffect } from 'react'

export default function useOutsideClick(ref, handleOutsideClick) {
  function performOutsideClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      handleOutsideClick()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', performOutsideClick)
    return () => {
      document.removeEventListener('mousedown', performOutsideClick)
    }
  })
}

