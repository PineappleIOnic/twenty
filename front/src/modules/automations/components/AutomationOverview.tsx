import React, { useCallback, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Activity } from '@/activities/types/Activity';
import { ActivityTarget } from '@/activities/types/ActivityTarget';
import { useUpdateOneObjectRecord } from '@/object-record/hooks/useUpdateOneObjectRecord';
import {
  Chip,
  ChipAccent,
  ChipSize,
  ChipVariant,
} from '@/ui/display/chip/components/Chip';
import { IconFunction } from '@/ui/display/icon';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';
import { debounce } from '~/utils/debounce';

import { Automation } from '../types/Automation';

import '@blocknote/core/style.css';

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow-y: auto;
`;

const StyledUpperPartContainer = styled.div`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing(4)};
  justify-content: flex-start;
`;

const StyledTopContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  background: ${({ theme }) => theme.background.secondary};
  border-bottom: ${({ theme }) =>
    useIsMobile() ? 'none' : `1px solid ${theme.border.color.medium}`};
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 24px 24px 48px;
`;

const StyledEditableTitleInput = styled.input<{
  completed: boolean;
  value: string;
}>`
  background: transparent;

  border: none;
  color: ${({ theme, value }) =>
    value ? theme.font.color.primary : theme.font.color.light};
  display: flex;

  flex-direction: column;
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};

  line-height: ${({ theme }) => theme.text.lineHeight.md};
  outline: none;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  &::placeholder {
    color: ${({ theme }) => theme.font.color.light};
  }
  width: calc(100% - ${({ theme }) => theme.spacing(2)});
`;

type AutomationOverviewProps = {
  automation: Pick<
    Automation,
    'id' | 'name' | 'type' | 'completedAt' | 'cron'
  > & {
    assignee?: Pick<WorkspaceMember, 'id' | 'name' | 'avatarUrl'> | null;
  } & {
    activityTargets?: Array<
      Pick<ActivityTarget, 'id' | 'companyId' | 'personId'>
    > | null;
  };
};

export const AutomationOverview = ({ automation }: AutomationOverviewProps) => {
  const [hasUserManuallySetTitle, setHasUserManuallySetTitle] =
    useState<boolean>(false);

  const theme = useTheme();

  const [title, setTitle] = useState<string | null>(automation.name ?? '');

  const [dev, setDev] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { updateOneObject } = useUpdateOneObjectRecord<Activity>({
    objectNameSingular: 'activity',
  });

  const updateName = useCallback(
    (newName: string) => {
      updateOneObject?.({
        idToUpdate: automation.id,
        input: {
          name: newName ?? '',
        },
      });
    },
    [automation.id, updateOneObject],
  );

  const debouncedUpdateTitle = debounce(updateName, 200);

  const updateTitleFromBody = (body: string) => {
    const parsedTitle = JSON.parse(body)[0]?.content[0]?.text;
    if (!hasUserManuallySetTitle) {
      setTitle(parsedTitle);
      debouncedUpdateTitle(parsedTitle);
    }
  };

  if (!automation) {
    return <></>;
  }

  return (
    <StyledContainer ref={containerRef}>
      <StyledUpperPartContainer>
        <StyledTopContainer>
          <Chip
            label="Automation"
            leftComponent={<IconFunction size={theme.icon.size.md} />}
            size={ChipSize.Large}
            accent={ChipAccent.TextSecondary}
            variant={ChipVariant.Highlighted}
          />
          <StyledEditableTitleInput
            autoComplete="off"
            autoFocus
            placeholder={`New Automation`}
            onChange={(event) => updateTitleFromBody(event.target.value)}
            value={title ?? ''}
            completed={false}
          />
          <Chip
            label={dev ? 'Developer Mode' : 'Zen Mode'}
            size={ChipSize.Large}
            accent={ChipAccent.TextSecondary}
            variant={ChipVariant.Highlighted}
            onClick={() => setDev(!dev)}
          />
        </StyledTopContainer>
      </StyledUpperPartContainer>
    </StyledContainer>
  );
};
