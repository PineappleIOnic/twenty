import { atom } from 'recoil';

import { AutomationTargetableEntity } from '../types/AutomationTargetableEntity';

export const automationTargetableEntityArrayState = atom<
  AutomationTargetableEntity[]
>({
  key: 'automations/targetable-entity-array',
  default: [],
});
