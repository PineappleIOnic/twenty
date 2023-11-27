export type AutomationTargetableEntityType = 'Person' | 'Company' | 'Custom';

export type AutomationTargetableEntity = {
  id: string;
  type: AutomationTargetableEntityType;
  relatedEntities?: AutomationTargetableEntity[];
};
