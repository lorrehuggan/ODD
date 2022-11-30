import create from 'zustand'

interface DarkState {
  dark: boolean
  setDark: () => void
}

const useThemeStore = create<DarkState>((set) => ({
  dark: false,
  setDark: () => set((state) => ({ dark: !state.dark }))
}))

export default useThemeStore
