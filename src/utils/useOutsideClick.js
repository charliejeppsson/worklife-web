import { useEffect } from 'react'

export default function useOutsideClick(ref, handleOutsideClick) {
  function performOutsideClick(event) {
    const pickerNode = document.querySelector("div[role='presentation']");
    if (ref.current && !ref.current.contains(event.target)) {
      if (!pickerNode) {
        handleOutsideClick()
      } else if (!pickerNode.contains(event.target)) {
        handleOutsideClick() // To not treat MUI pickers as outside elements
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', performOutsideClick)
    return () => {
      document.removeEventListener('mousedown', performOutsideClick)
    }
  })
}

