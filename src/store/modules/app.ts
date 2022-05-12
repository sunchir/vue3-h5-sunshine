import type { STabList } from '/@/components/TabBar/index.vue';
import { defineStore } from 'pinia';
import { store } from '/@/store';

interface AppState {
  tabbars: STabList[];
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    tabbars: [],
  }),
  getters: {
    getTabbars(): STabList[] {
      return this.tabbars;
    },
  },
  actions: {
    setTabbars(tabbars: STabList[]) {
      this.tabbars = tabbars;
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
