import { create } from "zustand";

import type { AppUser } from "@/types";
import createSelectors from "./createSelectors";
interface AppStoreState {
    user:AppUser|null;
    setUser:(user:AppUser)=>void;
}

const useAppStoreBase = create<AppStoreState>((set)=>({
    user:null,
    setUser:(user:AppUser)=>set({user}),
}))

export const useAppStore = createSelectors(useAppStoreBase);