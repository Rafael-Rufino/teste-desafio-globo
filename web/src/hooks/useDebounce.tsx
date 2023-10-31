import { useRef } from 'react'

type AnyFn = (...args: any[]) => void

export function useDebounce<T extends AnyFn>(fn: T, delay: number) {
  const timeoutRef = useRef<number | null>(null)

  const debouncedFn: AnyFn = (...args) => {
    window.clearTimeout(timeoutRef.current as number)
    timeoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn as T
}
