import { isNonEmptyString } from '@sniptt/guards';

import { PageAddButton } from '@/ui/layout/page/PageAddButton';
import { useFilter } from '@/ui/object/object-filter-dropdown/hooks/useFilter';

import { useOpenCreateAutomationDrawer } from '../hooks/useOpenCreateAutomationDrawer';

export const PageAddAutomationButton = () => {
  const { selectedFilter } = useFilter();
  const openCreateAutomation = useOpenCreateAutomationDrawer();

  const handleClick = () => {
    openCreateAutomation({
      type: 'Simple',
      assigneeId: isNonEmptyString(selectedFilter?.value)
        ? selectedFilter?.value
        : undefined,
    });
  };

  return <PageAddButton onClick={handleClick} />;
};
