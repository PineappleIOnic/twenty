import { useRecoilState } from 'recoil';

import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';
import { RightDrawerHotkeyScope } from '@/ui/layout/right-drawer/types/RightDrawerHotkeyScope';
import { RightDrawerPages } from '@/ui/layout/right-drawer/types/RightDrawerPages';
import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';

import { viewableAutomationIdState } from '../states/viewableAutomationIdState';

export const useOpenAutomationRightDrawer = () => {
  const { openRightDrawer } = useRightDrawer();
  const [, setViewableAutomationId] = useRecoilState(viewableAutomationIdState);
  const setHotkeyScope = useSetHotkeyScope();

  return (AutomationId: string) => {
    setHotkeyScope(RightDrawerHotkeyScope.RightDrawer, { goto: false });
    setViewableAutomationId(AutomationId);
    openRightDrawer(RightDrawerPages.EditAutomation);
  };
};
