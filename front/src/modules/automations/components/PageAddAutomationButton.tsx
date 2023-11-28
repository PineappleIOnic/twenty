import { PageAddButton } from '@/ui/layout/page/PageAddButton';

import { useOpenCreateAutomationDrawer } from '../hooks/useOpenCreateAutomationDrawer';

export const PageAddAutomationButton = () => {
  const openCreateAutomation = useOpenCreateAutomationDrawer();

  const handleClick = () => {
    openCreateAutomation({
      type: 'Simple',
    });
  };

  return <PageAddButton onClick={handleClick} />;
};
