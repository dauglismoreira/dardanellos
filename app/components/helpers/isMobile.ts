'use client'
export const isMobile = (): boolean => {
  if (!(typeof window !== 'undefined')) {return false}

  const width = window.innerWidth <= 768

  const agent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return (width || agent)
}