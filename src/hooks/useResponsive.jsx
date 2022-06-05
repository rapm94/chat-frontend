import { useEffect, useState } from 'react'

const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true)
      setIsTablet(false)
      setIsDesktop(false)
    } else if (width >= 768 && width < 1024) {
      setIsMobile(false)
      setIsTablet(true)
      setIsDesktop(false)
    } else {
      setIsMobile(false)
      setIsTablet(false)
      setIsDesktop(true)
    }
  }, [width])

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}
