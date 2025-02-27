import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { useHandleCheckableActivityTargetChange } from '@/activities/hooks/useHandleCheckableActivityTargetChange';
import { ActivityTarget } from '@/activities/types/ActivityTarget';
import { flatMapAndSortEntityForSelectArrayOfArrayByName } from '@/activities/utils/flatMapAndSortEntityForSelectArrayByName';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useFilteredSearchEntityQuery } from '@/search/hooks/useFilteredSearchEntityQuery';
import { useRelationPicker } from '@/ui/input/components/internal/relation-picker/hooks/useRelationPicker';
import { MultipleEntitySelect } from '@/ui/input/relation-picker/components/MultipleEntitySelect';
import { useInlineCell } from '@/ui/object/record-inline-cell/hooks/useInlineCell';
import { assertNotNull } from '~/utils/assert';

type ActivityTargetInlineCellEditModeProps = {
  activityId: string;
  activityTargets: Array<Pick<ActivityTarget, 'id' | 'personId' | 'companyId'>>;
};

const StyledSelectContainer = styled.div`
  left: 0px;
  position: absolute;
  top: -8px;
`;

export const ActivityTargetInlineCellEditMode = ({
  activityId,
  activityTargets,
}: ActivityTargetInlineCellEditModeProps) => {
  const [searchFilter, setSearchFilter] = useState('');

  const initialPeopleIds = useMemo(
    () =>
      activityTargets
        ?.filter(({ personId }) => personId !== null)
        .map(({ personId }) => personId)
        .filter(assertNotNull) ?? [],
    [activityTargets],
  );

  const initialCompanyIds = useMemo(
    () =>
      activityTargets
        ?.filter(({ companyId }) => companyId !== null)
        .map(({ companyId }) => companyId)
        .filter(assertNotNull) ?? [],
    [activityTargets],
  );

  const initialSelectedEntityIds = useMemo(
    () =>
      [...initialPeopleIds, ...initialCompanyIds].reduce<
        Record<string, boolean>
      >((result, entityId) => ({ ...result, [entityId]: true }), {}),
    [initialPeopleIds, initialCompanyIds],
  );

  const { findManyQuery: findManyPeopleQuery } = useObjectMetadataItem({
    objectNameSingular: 'person',
  });

  const { findManyQuery: findManyCompaniesQuery } = useObjectMetadataItem({
    objectNameSingular: 'company',
  });

  const useFindManyPeopleQuery = (options: any) =>
    useQuery(findManyPeopleQuery, options);

  const useFindManyCompaniesQuery = (options: any) =>
    useQuery(findManyCompaniesQuery, options);

  const [selectedEntityIds, setSelectedEntityIds] = useState<
    Record<string, boolean>
  >(initialSelectedEntityIds);

  const { identifiersMapper, searchQuery } = useRelationPicker();

  const people = useFilteredSearchEntityQuery({
    queryHook: useFindManyPeopleQuery,
    filters: [
      {
        fieldNames: searchQuery?.computeFilterFields?.('person') ?? [],
        filter: searchFilter,
      },
    ],
    orderByField: 'createdAt',
    mappingFunction: (record: any) => identifiersMapper?.(record, 'person'),
    selectedIds: initialPeopleIds,
    objectNamePlural: 'people',
    limit: 3,
  });

  const companies = useFilteredSearchEntityQuery({
    queryHook: useFindManyCompaniesQuery,
    filters: [
      {
        fieldNames: searchQuery?.computeFilterFields?.('company') ?? [],
        filter: searchFilter,
      },
    ],
    orderByField: 'createdAt',
    mappingFunction: (record: any) => identifiersMapper?.(record, 'company'),
    selectedIds: initialCompanyIds,
    objectNamePlural: 'companies',
    limit: 3,
  });

  const selectedEntities = flatMapAndSortEntityForSelectArrayOfArrayByName([
    people.selectedEntities,
    companies.selectedEntities,
  ]);

  const filteredSelectedEntities =
    flatMapAndSortEntityForSelectArrayOfArrayByName([
      people.filteredSelectedEntities,
      companies.filteredSelectedEntities,
    ]);

  const entitiesToSelect = flatMapAndSortEntityForSelectArrayOfArrayByName([
    people.entitiesToSelect,
    companies.entitiesToSelect,
  ]);

  const handleCheckItemsChange = useHandleCheckableActivityTargetChange({
    activityId,
    currentActivityTargets: activityTargets,
  });
  const { closeInlineCell: closeEditableField } = useInlineCell();

  const handleSubmit = useCallback(() => {
    handleCheckItemsChange(
      selectedEntityIds,
      entitiesToSelect,
      selectedEntities,
    );
    closeEditableField();
  }, [
    closeEditableField,
    entitiesToSelect,
    handleCheckItemsChange,
    selectedEntities,
    selectedEntityIds,
  ]);

  const handleCancel = () => {
    closeEditableField();
  };

  return (
    <StyledSelectContainer>
      <MultipleEntitySelect
        entities={{
          entitiesToSelect,
          filteredSelectedEntities,
          selectedEntities,
          loading: false,
        }}
        onChange={setSelectedEntityIds}
        onSearchFilterChange={setSearchFilter}
        searchFilter={searchFilter}
        value={selectedEntityIds}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </StyledSelectContainer>
  );
};
