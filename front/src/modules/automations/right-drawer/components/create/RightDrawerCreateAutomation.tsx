import { useRecoilValue } from 'recoil';

import { viewableAutomationIdState } from '@/automations/states/viewableAutomationIdState';

import { RightDrawerAutomation } from '../RightDrawerAutomation';

export const RightDrawerCreateAutomation = () => {
  const viewableAutomationId = useRecoilValue(viewableAutomationIdState);

  return (
    <>
      {viewableAutomationId && (
        <RightDrawerAutomation automationId={viewableAutomationId} />
      )}
    </>
  );
};
