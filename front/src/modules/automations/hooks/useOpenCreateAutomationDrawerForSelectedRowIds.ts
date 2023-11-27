import { useRecoilCallback } from 'recoil';

import { AutomationType } from '@/automations/types/Automation';
import { selectedRowIdsSelector } from '@/ui/object/record-table/states/selectors/selectedRowIdsSelector';

import {
  AutomationTargetableEntity,
  AutomationTargetableEntityType,
} from '../types/AutomationTargetableEntity';

import { useOpenCreateAutomationDrawer } from './useOpenCreateAutomationDrawer';

export const useOpenCreateAutomationDrawerForSelectedRowIds = () => {
  const openCreateAutomationDrawer = useOpenCreateAutomationDrawer();

  return useRecoilCallback(
    ({ snapshot }) =>
      (
        type: AutomationType,
        entityType: AutomationTargetableEntityType,
        relatedEntities?: AutomationTargetableEntity[],
      ) => {
        const selectedRowIds = Object.keys(
          snapshot.getLoadable(selectedRowIdsSelector).getValue(),
        );
        let automationTargetableEntityArray: AutomationTargetableEntity[] =
          selectedRowIds.map((id) => ({
            type: entityType,
            id,
          }));
        if (relatedEntities) {
          automationTargetableEntityArray =
            automationTargetableEntityArray.concat(relatedEntities);
        }
        openCreateAutomationDrawer({
          type,
          targetableEntities: automationTargetableEntityArray,
        });
      },
  );
};
