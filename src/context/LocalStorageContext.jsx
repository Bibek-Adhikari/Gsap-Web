import React, { createContext, useContext, useCallback } from 'react'

const LocalStorageContext = createContext(null)

export const useLocalStorageContext = () => {
  return useContext(LocalStorageContext)
}

export const LocalStorageProvider = ({ children }) => {
  const getItem = useCallback((key) => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      return null
    }
  }, [])

  const setItem = useCallback((key, value) => {
    try {
      const raw = JSON.stringify(value)
      window.localStorage.setItem(key, raw)
    } catch (e) {
      // ignore
    }
  }, [])

  const removeItem = useCallback((key) => {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {
      // ignore
    }
  }, [])

  const contextValue = {
    getItem,
    setItem,
    removeItem,
  }

  return (
    <LocalStorageContext.Provider value={contextValue}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function useLocalStorage(key, initialValue) {
  const ctx = useLocalStorageContext()
  if (!ctx) {
    // fallback to direct localStorage if provider missing
    const read = () => {
      try {
        const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
        return raw ? JSON.parse(raw) : initialValue
      } catch (e) {
        return initialValue
      }
    }

    const set = (v) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(v))
      } catch (e) {}
    }

    return [read(), set]
  }

  const read = () => ctx.getItem(key) ?? initialValue
  const set = (v) => ctx.setItem(key, v)
  return [read(), set]
}

export default LocalStorageContext
