import { atom } from 'recoil';

export const viewableAutomationIdState = atom<string | null>({
  key: 'activities/viewable-automation-id',
  default: null,
});
