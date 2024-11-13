import { useCallback, useState, useEffect, useDebugValue } from "react"

const useStorage = (key, defaultValue, storageObject) => {
  const [value, setValue] = useState(() => {
    return getSavedValues(key, defaultValue)
  })

  useDebugValue({key, value}) // see LocalStorage value at React Developer Tool

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}

// get current value from storage
function getSavedValues(key, defaultValue) {
  const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
}

export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage)
}