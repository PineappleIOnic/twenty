import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { AutomationOverview } from '@/automations/components/AutomationOverview';
import { Automation } from '@/automations/types/Automation';
import { useFindOneObjectRecord } from '@/object-record/hooks/useFindOneObjectRecord';
import { entityFieldsFamilyState } from '@/ui/object/field/states/entityFieldsFamilyState';

import '@blocknote/core/style.css';

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow-y: auto;
  position: relative;
`;

type RightDrawerAutomationProps = {
  automationId: string;
};

export const RightDrawerAutomation = ({
  automationId,
}: RightDrawerAutomationProps) => {
  const [, setEntityFields] = useRecoilState(
    entityFieldsFamilyState(automationId),
  );

  const { object: automation } = useFindOneObjectRecord({
    objectNameSingular: 'automation',
    objectRecordId: automationId,
    skip: !automationId,
    onCompleted: (automation: Automation) => {
      setEntityFields(automation ?? {});
    },
  });

  if (!automation) {
    return <></>;
  }

  return (
    <StyledContainer>
      <AutomationOverview automation={automation} />
    </StyledContainer>
  );
};
