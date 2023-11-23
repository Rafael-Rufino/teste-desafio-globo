import { renderHook } from '@testing-library/react'

import useHeader from './useHeader'

describe('useHeader', () => {
  test('should returns default values', () => {
    const { result } = renderHook(() => useHeader())

    expect(result.current.isModalVisible).toBe(false)
    expect(result.current.highlights).toEqual([])
    expect(result.current.filteredSuggestionsByQuery).toEqual([])
    expect(result.current.modalRef.current).toBe(null)
    expect(result.current.inputRef.current).toBe(null)
    expect(result.current.closeModalAndResetSearch).toBeInstanceOf(Function)
    expect(result.current.handleChangeSearch).toBeInstanceOf(Function)
    expect(result.current.handleArrowKeyNavigation).toBeInstanceOf(Function)
  })
})
