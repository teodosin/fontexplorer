'use client'

import { useEffect } from 'react'

export default function FontLoader({ fonts }: { fonts: any[] }) {
  localStorage.setItem("fonts", JSON.stringify(fonts));

  let fontFamilies = fonts.map(f => f.family)

  useEffect(() => {
    const families = fontFamilies.map(f => encodeURIComponent(f)).join('&family=')
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [fontFamilies])

  return null
}
