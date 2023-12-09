import { useEffect, useState } from 'react'

/**
 * Debounce hook
 */
const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setIsLoading(false)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return { debouncedValue, isLoading }
}

export default useDebounce
