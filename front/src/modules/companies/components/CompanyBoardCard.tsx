import { ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { useUpdateOneObjectRecord } from '@/object-record/hooks/useUpdateOneObjectRecord';
import { EntityChipVariant } from '@/ui/display/chip/components/EntityChip';
import { IconEye } from '@/ui/display/icon/index';
import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { Checkbox, CheckboxVariant } from '@/ui/input/components/Checkbox';
import { FieldContext } from '@/ui/object/field/contexts/FieldContext';
import { BoardCardIdContext } from '@/ui/object/record-board/contexts/BoardCardIdContext';
import { useBoardContext } from '@/ui/object/record-board/hooks/useBoardContext';
import { useCurrentCardSelected } from '@/ui/object/record-board/hooks/useCurrentCardSelected';
import { isCardInCompactViewState } from '@/ui/object/record-board/states/isCardInCompactViewState';
import { isCompactViewEnabledState } from '@/ui/object/record-board/states/isCompactViewEnabledState';
import { visibleBoardCardFieldsScopedSelector } from '@/ui/object/record-board/states/selectors/visibleBoardCardFieldsScopedSelector';
import { RecordInlineCell } from '@/ui/object/record-inline-cell/components/RecordInlineCell';
import { InlineCellHotkeyScope } from '@/ui/object/record-inline-cell/types/InlineCellHotkeyScope';
import { AnimatedEaseInOut } from '@/ui/utilities/animation/components/AnimatedEaseInOut';
import { useRecoilScopedValue } from '@/ui/utilities/recoil-scope/hooks/useRecoilScopedValue';
import { getLogoUrlFromDomainName } from '~/utils';

import { companyProgressesFamilyState } from '../states/companyProgressesFamilyState';

import { CompanyChip } from './CompanyChip';

const StyledBoardCard = styled.div<{ selected: boolean }>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.accent.quaternary : theme.background.secondary};
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.accent.secondary : theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  color: ${({ theme }) => theme.font.color.primary};
  &:hover {
    background-color: ${({ theme, selected }) =>
      selected && theme.accent.tertiary};
    border: 1px solid
      ${({ theme, selected }) =>
        selected ? theme.accent.primary : theme.border.color.medium};
  }
  cursor: pointer;

  .checkbox-container {
    transition: all ease-in-out 160ms;
    opacity: ${({ selected }) => (selected ? 1 : 0)};
  }

  &:hover .checkbox-container {
    opacity: 1;
  }

  .compact-icon-container {
    transition: all ease-in-out 160ms;
    opacity: 0;
  }
  &:hover .compact-icon-container {
    opacity: 1;
  }
`;

const StyledBoardCardWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const StyledBoardCardHeader = styled.div<{
  showCompactView: boolean;
}>`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  height: 24px;
  padding-bottom: ${({ theme, showCompactView }) =>
    theme.spacing(showCompactView ? 0 : 1)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(2)};
  transition: padding ease-in-out 160ms;

  img {
    height: ${({ theme }) => theme.icon.size.md}px;
    margin-right: ${({ theme }) => theme.spacing(2)};
    object-fit: cover;
    width: ${({ theme }) => theme.icon.size.md}px;
  }
`;

const StyledBoardCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(2.5)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  span {
    align-items: center;
    display: flex;
    flex-direction: row;
    svg {
      color: ${({ theme }) => theme.font.color.tertiary};
      margin-right: ${({ theme }) => theme.spacing(2)};
    }
  }
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
`;

const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledCompactIconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const CompanyBoardCard = () => {
  const { BoardRecoilScopeContext } = useBoardContext();

  const { isCurrentCardSelected, setCurrentCardSelected } =
    useCurrentCardSelected();
  const boardCardId = useContext(BoardCardIdContext);

  const [companyProgress] = useRecoilState(
    companyProgressesFamilyState(boardCardId ?? ''),
  );

  const [isCompactViewEnabled] = useRecoilState(isCompactViewEnabledState);

  const [isCardInCompactView, setIsCardInCompactView] = useRecoilState(
    isCardInCompactViewState(boardCardId ?? ''),
  );

  const showCompactView = isCompactViewEnabled && isCardInCompactView;

  const { opportunity, company } = companyProgress ?? {};

  const visibleBoardCardFields = useRecoilScopedValue(
    visibleBoardCardFieldsScopedSelector,
    BoardRecoilScopeContext,
  );

  const useUpdateOneObjectMutation: () => [(params: any) => any, any] = () => {
    const { updateOneObject } = useUpdateOneObjectRecord({
      objectNameSingular: 'opportunity',
    });

    const updateEntity = ({
      variables,
    }: {
      variables: {
        where: { id: string };
        data: {
          [fieldName: string]: any;
        };
      };
    }) => {
      updateOneObject?.({
        idToUpdate: variables.where.id,
        input: variables.data,
      });
    };

    return [updateEntity, { loading: false }];
  };

  // boardCardId check can be moved to a wrapper to avoid unnecessary logic above
  if (!company || !opportunity || !boardCardId) {
    return null;
  }

  const PreventSelectOnClickContainer = ({
    children,
  }: {
    children: ReactNode;
  }) => (
    <StyledFieldContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </StyledFieldContainer>
  );

  const OnMouseLeaveBoard = () => {
    setIsCardInCompactView(true);
  };

  return (
    <StyledBoardCardWrapper>
      <StyledBoardCard
        selected={isCurrentCardSelected}
        onMouseLeave={OnMouseLeaveBoard}
        onClick={() => setCurrentCardSelected(!isCurrentCardSelected)}
      >
        <StyledBoardCardHeader showCompactView={showCompactView}>
          <CompanyChip
            id={company.id}
            name={company.name}
            avatarUrl={getLogoUrlFromDomainName(company.domainName)}
            variant={EntityChipVariant.Transparent}
          />
          {showCompactView && (
            <StyledCompactIconContainer className="compact-icon-container">
              <LightIconButton
                Icon={IconEye}
                accent="tertiary"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCardInCompactView(false);
                }}
              />
            </StyledCompactIconContainer>
          )}
          <StyledCheckboxContainer className="checkbox-container">
            <Checkbox
              checked={isCurrentCardSelected}
              onChange={() => setCurrentCardSelected(!isCurrentCardSelected)}
              variant={CheckboxVariant.Secondary}
            />
          </StyledCheckboxContainer>
        </StyledBoardCardHeader>
        <StyledBoardCardBody>
          <AnimatedEaseInOut isOpen={!showCompactView} initial={false}>
            {visibleBoardCardFields.map((viewField) => (
              <PreventSelectOnClickContainer key={viewField.fieldMetadataId}>
                <FieldContext.Provider
                  value={{
                    entityId: boardCardId,
                    recoilScopeId: boardCardId + viewField.fieldMetadataId,
                    isLabelIdentifier: false,
                    fieldDefinition: {
                      fieldMetadataId: viewField.fieldMetadataId,
                      label: viewField.label,
                      iconName: viewField.iconName,
                      type: viewField.type,
                      metadata: viewField.metadata,
                    },
                    useUpdateEntityMutation: useUpdateOneObjectMutation,
                    hotkeyScope: InlineCellHotkeyScope.InlineCell,
                  }}
                >
                  <RecordInlineCell />
                </FieldContext.Provider>
              </PreventSelectOnClickContainer>
            ))}
          </AnimatedEaseInOut>
        </StyledBoardCardBody>
      </StyledBoardCard>
    </StyledBoardCardWrapper>
  );
};
