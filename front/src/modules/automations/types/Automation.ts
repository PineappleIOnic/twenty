import { ActivityTarget } from '@/activities/types/ActivityTarget';

export type AutomationType = 'Simple' | 'Advanced';

export type Automation = {
  __typename: 'Function';
  id: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  cron: string | null;
  activityTargets: ActivityTarget[];
  type: AutomationType;
  name: string;
};
