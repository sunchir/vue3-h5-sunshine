import { useGlobSetting } from './useGlobSetting';

export const useSetTitle = (title: string) => {
  document.title = title || useGlobSetting()?.title;
};
