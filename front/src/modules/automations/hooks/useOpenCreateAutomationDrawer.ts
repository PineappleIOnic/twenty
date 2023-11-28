import { useRecoilState, useRecoilValue } from 'recoil';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { Automation, AutomationType } from '@/automations/types/Automation';
import { AutomationTarget } from '@/automations/types/AutomationTarget';
import { useCreateOneObjectRecord } from '@/object-record/hooks/useCreateOneObjectRecord';
import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';
import { RightDrawerHotkeyScope } from '@/ui/layout/right-drawer/types/RightDrawerHotkeyScope';
import { RightDrawerPages } from '@/ui/layout/right-drawer/types/RightDrawerPages';
import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';

import { automationTargetableEntityArrayState } from '../states/automationTargetableEntityArrayState';
import { viewableAutomationIdState } from '../states/viewableAutomationIdState';
import { AutomationTargetableEntity } from '../types/AutomationTargetableEntity';
import { getTargetableEntitiesWithParents } from '../utils/getTargetableEntitiesWithParents';

export const useOpenCreateAutomationDrawer = () => {
  const { openRightDrawer } = useRightDrawer();
  const { createOneObject: createOneAutomationTarget } =
    useCreateOneObjectRecord<AutomationTarget>({
      objectNameSingular: 'automationTarget',
    });
  const { createOneObject: createOneAutomation } =
    useCreateOneObjectRecord<Automation>({
      objectNameSingular: 'automation',
    });
  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);
  const setHotkeyScope = useSetHotkeyScope();

  const [, setAutomationTargetableEntityArray] = useRecoilState(
    automationTargetableEntityArrayState,
  );
  const [, setViewableAutomationId] = useRecoilState(viewableAutomationIdState);

  return async ({
    type,
    targetableEntities,
  }: {
    type: AutomationType;
    targetableEntities?: AutomationTargetableEntity[];
  }) => {
    const targetableEntitiesWithRelations = targetableEntities
      ? getTargetableEntitiesWithParents(targetableEntities)
      : [];

    const createdAutomation = await createOneAutomation?.({
      type: type,
    });

    if (!createdAutomation) {
      return;
    }

    await Promise.all(
      targetableEntitiesWithRelations.map(async (targetableEntity) => {
        await createOneAutomationTarget?.({
          companyId:
            targetableEntity.type === 'Company' ? targetableEntity.id : null,
          personId:
            targetableEntity.type === 'Person' ? targetableEntity.id : null,
          automationId: createdAutomation.id,
        });
      }),
    );

    setHotkeyScope(RightDrawerHotkeyScope.RightDrawer, { goto: false });
    setViewableAutomationId(createdAutomation.id);
    setAutomationTargetableEntityArray(targetableEntities ?? []);
    openRightDrawer(RightDrawerPages.CreateAutomation);
  };
};
