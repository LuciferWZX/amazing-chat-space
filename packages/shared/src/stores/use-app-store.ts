import type { AppUser } from '@/types'
import { create } from 'zustand'
import createSelectors from './createSelectors'

interface AppStoreState {
  user: AppUser | null
  logoutOpen: boolean
  kickedOpen: boolean
}
interface Action {
  reset: () => void
  setUser: (user: AppUser) => void
}
const initialState: AppStoreState = {
  user: null,
  logoutOpen: false,
  kickedOpen: false,
}
const useAppStoreBase = create<AppStoreState & Action>(set => ({
  ...initialState,
  setUser: (user: AppUser) => set({ user }),
  reset: () => {
    set({ ...initialState })
  },
}))

export const useAppStore = createSelectors(useAppStoreBase)
